const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')
const {SECRET} = require('../../config');

function genToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET, {expiresIn: '2h'});
}

module.exports = {
    Mutation : {
        async login(_, {username, password}){
            const { valid, errors} = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError('Incorrect Credentials', {errors})
            }
            const user = await User.findOne({username});
            if (!user){
                errors.general = 'User does not exist';
                throw new UserInputError('User does not exist', {errors})
            } 
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Incorrect Credentials';
                throw new UserInputError('Incorrect Credentials', {errors})
            }
            const token = genToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(
            _,
            {
                registerInput: {username, email, password, confirmPassword}
            }, 
            context, 
            info)
            {
            //Validation
            const { valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid){
                throw new UserInputError('Errors', {errors});
            }
            //Make sure user doesn't exist
            const user = await User.findOne({username});
            if (user){
                throw new UserInputError('username is taken', {
                    errors: {
                        username: 'Taken Username'
                    }
                })
            }
            //hash password and create auth token
            password  = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save();
            const token = genToken(res);
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
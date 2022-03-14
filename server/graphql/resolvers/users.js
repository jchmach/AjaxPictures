const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput} = require('../../utils/validators')
const {SECRET} = require('../../config');

module.exports = {
    Mutation : {
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
                throw new UserInputError('Erros', {errors});
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
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET, {expiresIn: '2h'});
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
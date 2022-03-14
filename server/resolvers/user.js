import Joi from "joi"
import { signUp, signIn, signOut} from "../schemas/index.js"
import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import { User } from "../models/index.js"
import * as Auth from "../auth.js"
import { AuthenticationError } from "apollo-server-express"

export default {
    Query: {
        me: (root, arg, {req}, info) => {
            Auth.checkSignedIn(req)
            return User.findById(req.session.userId)
        },
        users: (root, arg, {req}, info) => {
            //TODO: auth, projection
            
            Auth.checkSignedIn(req)
            return User.find({})
        },
        user: (root, { id }, {req}, info) => {
            Auth.checkSignedIn(req)
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new UserInputError("invalid user id")
            }
            return User.findById(id)
        }
    },
    Mutation:{
        signUp: async (root, arg, {req}, info) => {
            Auth.checkSignedOut(req)
            const validationResult = await signUp.validate(arg)
            if (!validationResult.error){
                //create user
                const user = await User.create(arg)
                req.session.userId = user.id
                Auth.checkSignedIn(req)
                return user
            } else{
                console.log(validationResult)
                throw new UserInputError("invalid arguments")
            }
        },

        signIn : async (root, arg, {req}, info) => {
            const { userId } = req.session
            console.log(req.session)
            if (userId){
                return await User.findById(userId)
            }
            const validationResult = await signIn.validate(arg, {abortEarly: false})
            if (!validationResult.error){
                const user = await User.findOne({email: arg.email})
                req.session.userId = user.id
                Auth.checkSignedIn(req)
                //console.log(req.session)
                return user
            } else{
                console.log(validationResult)
                throw new AuthenticationError("invalid arguments")
            }
            
        },
        signOut : async (root, arg, {req, res}, info) => {
            console.log(req.session)
            Auth.checkSignedIn(req)
            return Auth.signOut(req, res)
        }
    }
}
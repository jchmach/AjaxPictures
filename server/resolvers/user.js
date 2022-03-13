import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import { User } from "../models/index.js"

export default {
    Query: {
        users: (root, arg, context, info) => {
            //TODO: auth, projection
            return User.find({})
        },
        user: (root, { id }, context, info) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new UserInputError("invalid user id")
            }

            return User.findById(id)
        }
    },
    Mutation:{
        signUp: (root, arg, context, info) => {
            //TODO: not auth

            //validation

            //create user 
            return User.create(arg)
        }
    }
}
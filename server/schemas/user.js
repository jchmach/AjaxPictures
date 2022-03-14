import Joi from "joi";

const email = Joi.string().email().required().label('Email')
const username = Joi.string().alphanum().min(2).max(30).required().label('Username')
const name = Joi.string().max(254).required().label('Name')
const password = Joi.string().min(2).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).label('Password')

export const signUp = Joi.object({
    email, username, name, password
})

export const signIn = Joi.object({
    email, password
})

export const signOut = Joi.object({
    email, password
})
import { AuthenticationError } from "apollo-server-express"
import { User } from "./models/index.js"

export const attemptSignIn = async (email, password) => {
    const user = await User.findOne({email})
    if (!user){
        throw new AuthenticationError('Incorrect email or password, try again')
    }
    if (!await user.matchesPassword(password)){
        throw new AuthenticationError('Password incorrect')
    }
    return user
}

export const checkSignedIn = req => {
    console.log(req.session)
    if (!req.session.userId) {
        throw new AuthenticationError('You must be signed in')
    }
}

export const checkSignedOut = req => {
    if (req.session.userId) {
        throw new AuthenticationError('You are already signed in')
    }
}

export const signOut = (req, res) => new Promise((resolve, reject) =>{
    req.session.destroy(err => {
        if (err) reject(err)

        res.clearCookie("sessionName")
        resolve(true)
    })
})



import mongoose from "mongoose"
import pkg from "bcryptjs"
const { hash, compare } = pkg;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: async email => await User.where({email}).countDocuments() === 0
        }
    },
    username: {
        type: String,
        validate: {
            validator: async username => await User.where({username}).countDocuments() === 0
        }
    },
    name: String,
    password: String
}, {
    timestamps: true
})

userSchema.pre('save', async function () {
    if (this.isModified('password')){
        this.password = await hash(this.password, 10)
    }
})

userSchema.methods.matchesPassword = function (password){
    return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
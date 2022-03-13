import mongoose from "mongoose"
import hash from 'bcryptjs'
const userSchema = new mongoose.Schema({
    email: String,
    username: String,
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

export default mongoose.model('User', userSchema)
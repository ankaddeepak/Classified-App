import mongoose from "mongoose"
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum:['admin','seller','buyer']
    },
    isActive: {
        type: Boolean,
        default: true,
        enum: ['true', 'false']
    }
},{ timestamps: true })

const User = model('User', userSchema)
export default User
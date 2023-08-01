import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "email already exists in database"],
        lowercase: true,
        trim: true,
        required: true,
        validate: {
            validator: function(v){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) 
            },
            message: '{VALUE} is not a valid email'
        }
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default:Date.now()
    }
})

export default mongoose.model('User', userSchema)
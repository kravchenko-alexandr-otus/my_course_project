import mongoose, { Mongoose } from "mongoose"

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

const LessonSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    videoPath:{
        type: String
    },
    otherFiles: {
        type: String
    },
    owner: {
        type: String
    },
    accordingToCourse:{
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const CommentsSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    body:{
        type: String,
        required: true
    },
    lessonId:{
        type: mongoose.Types.ObjectId,
        required:true
    }
})

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type:String,
        required:true
    },
    allowedTo:{
        type:[String]
    }
})

export const User =  mongoose.model('User', userSchema)
export const Lesson = mongoose.model('Lesson', LessonSchema)
export const Comment = mongoose.model('comment', CommentsSchema)
export const Course = mongoose.model('course', CourseSchema)
import {User, Lesson, Course, Comment} from '../models/models.js'
import { __dirname } from '../config.js'
import path from 'path'
import mongoose from 'mongoose'

export const main = (req, res) => {
    if (req.query.message){
        return res.render('main', {message:req.query.message})
    }
    res.render('main')
}
export const registration = (req, res) => res.render('registration', {layout:'register.handlebars'})

export const lesson = async (req, res) => {
    const lesson = await Lesson.findOne({_id:req.query.id}).lean()
    const id = req.query.id
    const title = lesson.title
    const body = lesson.body
    const videoPath = lesson.videoPath
    const comments = await Comment.find({lessonId: req.query.id}).lean()
    let owner = req.cookies.username ==lesson.owner
    console.log(owner)

    res.render('lesson_page', { videoPath:videoPath, title:title, 
                body:body, lesson_id:id, comments:comments, owner:owner})
}

export const update_lesson_page = async (req, res) => {
    const lesson_id = req.query.id
    const lesson = await Lesson.findOne({_id: lesson_id}).lean()
    const body = lesson.body
    const title = lesson.title
    res.render('update_lesson', {lesson_id:lesson_id, body:body, title:title})
}

export const update_leson = async (req, res) => {
    const id = req.query.id
    const lesson = await Lesson.findById(id)
    const body = req.body.postText
    const title = req.body.title
    console.log(body, title)
    await lesson.updateOne({
        body:body,
        title:title
    })
    res.redirect(`/lesson?id=${id}`)
}

export const courses = async(req, res) => {
    const courses = await Course.find({}).lean()
    for (let course of courses){
        course["lessons"] = await Lesson.find({accordingToCourse: course._id}).lean()
    }
    if(req.query.notAllowed){
        return res.render('courses', {courses:courses, message: 'You are not allowed to this course'})
    }
    res.render('courses', {courses:courses})}

export const isAllowedToCourse = async (req, res, next) =>{
    const course = await Course.findById(req.params.id).lean()
    if (course.allowedTo.includes(req.cookies.username)){
        next()
    } else{
        res.redirect('/courses?notAllowed=true')
    }
}

export const login = (req, res) => res.render('login_page')

export const create_lesson = (req, res) => {
    const id = req.params.id
    res.render('create_lesson', {course_id: id})}

export const create_course = (req, res) => res.render('create_course')

export const course_lessons = async (req, res) =>{
    const id = req.params.id
    const course_lessons = await Lesson.find({accordingToCourse:id}).lean()
    const owner = true
    res.render('lessons', {owner:owner, lessons:course_lessons, id:req.params.id})
}

export const upload_course = (req, res) => {
    const allowedTo = req.body.availableFor.split(',')
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        owner: req.cookies.username,
        allowedTo: allowedTo
    })
    course.save()
        .then(course=>console.log(course.title))
        .catch(err=>console.log(err.message))
    res.redirect('/courses')
}

export const upload_data = (req, res) => {
    const courseId = req.params.id
    const lesson = new Lesson({
        title: req.body.title,
        body: req.body.postText,
        videoPath: path.join('uploads', req.file.filename),
        owner: req.cookies.username,
        accordingToCourse: new mongoose.Types.ObjectId(courseId)
    })
    lesson.save()
        .then(post=>console.log(post.title))
        .catch(err=>console.log(err.message))
    res.redirect(`/courses/${courseId}/lessons`)
}

export const save_comment = (req, res) => {
    const lessonId = req.query.id
    const comment = new Comment({
        username: req.cookies.username,
        body: req.body.commentText,
        lessonId: new mongoose.Types.ObjectId(lessonId)
    })
    comment.save()
        .then(comment => res.redirect(`lesson?id=${lessonId}`))
        .catch(err => console.log(err))
}

export const logout = (req, res) => {
    res.cookie('access_token', '')
    res.redirect('/')
}

export const profile = (req, res) => {
    const username = req.params.username
    const user = User.findOne({
        username
    })
    res.render('profile', {layout:'profile'})
}



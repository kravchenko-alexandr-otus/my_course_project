import {Comment} from '../models/models.js'
import { __dirname } from '../config.js'
import path from 'path'
import mongoose from 'mongoose'

import { findLessonObjectById, findLessonDocumentById, findAllLessonsOfCourse, createLesson } from '../services/lesson.services.js'
import { allCoursesObjects, createCourse, findCourseObjectById } from '../services/courses.services.js'
import { createComment, findCommentsOfLesson } from '../services/comments.services.js'



export const main = (req, res) => {
    if (req.query.message){
        return res.render('main', {message:req.query.message})
    }
    res.render('main')
}
export const registration = (req, res) => res.render('registration', {layout:'register.handlebars'})

export const lesson = async (req, res) => {
    const lesson = await findLessonObjectById({_id:req.query.id})
    const id = req.query.id
    const title = lesson.title
    const body = lesson.body
    const videoPath = lesson.videoPath
    const comments = await findCommentsOfLesson(req.query.id)
    let owner = req.cookies.username ==lesson.owner

    res.render('lesson_page', { videoPath:videoPath, title:title, 
                body:body, lesson_id:id, comments:comments, owner:owner})
}

export const update_lesson_page = async (req, res) => {
    const lesson_id = req.query.id
    const lesson = await findLessonObjectById({_id: lesson_id})
    const body = lesson.body
    const title = lesson.title
    res.render('update_lesson', {lesson_id:lesson_id, body:body, title:title})
}

export const update_lesson = async (req, res) => {
    const id = req.query.id
    const lesson = await findLessonDocumentById(id)
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
    const courses = await allCoursesObjects()
    for (let course of courses){
        course["lessons"] = await findAllLessonsOfCourse({accordingToCourse:course._id})
    }
    if(req.query.notAllowed){
        return res.render('courses', {courses:courses, message: 'You are not allowed to this course'})
    }
    res.render('courses', {courses:courses})}

export const isAllowedToCourse = async (req, res, next) =>{
    const course = await findCourseObjectById(req.params.id)
    
    if (course.allowedTo.includes(req.cookies.username) || course.owner===req.cookies.username){
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
    const course_lessons = await findAllLessonsOfCourse({accordingToCourse:id})
    const owner = true
    res.render('lessons', {owner:owner, lessons:course_lessons, id:req.params.id})
}

export const upload_course = (req, res) => {
    const allowedTo = req.body.availableFor.split(',')
    const course = createCourse({
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
    const lesson = createLesson({
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
    const comment = createComment({
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
    res.cookie('username', '')
    res.redirect('/')
}

export const errorHandler = (err, req, res, next) => {
    res.render('error', {layout: 'error', status:err.status, message:err.message})
}
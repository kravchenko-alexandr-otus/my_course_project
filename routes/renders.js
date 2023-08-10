import express from 'express'
import * as handlers from '../handlers/handlers.js'
import verifyToken from '../handlers/authJWT.js'
const router = express.Router()

router.get('/', handlers.main)

router.get('/registration', handlers.registration)

router.get('/create_course',verifyToken, handlers.create_course)

router.get('/courses',verifyToken, handlers.courses)

router.get('/courses/:id/lessons', handlers.course_lessons)

router.get('/create_lesson/:id', handlers.create_lesson)

router.get('/courses/lesson/:id', handlers.lesson)

export default router
import express from 'express'
import * as handlers from '../handlers/handlers.js'

const router = express.Router()

router.get('/', handlers.main)

router.get('/about', handlers.about)

router.get('/blog', handlers.blog)

router.get('/teachers', handlers.teachers)

router.get('/registration', handlers.registration)

export default router
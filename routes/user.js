import express from 'express'
import {signup, signin } from '../handlers/auth.controller.js'
import validator from '../validators/validator.js'

var router = express.Router()

router.post("/signup", validator('register'), signup)
router.post("/signin", validator('login'), signin)


export default router
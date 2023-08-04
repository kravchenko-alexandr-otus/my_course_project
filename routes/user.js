import express from 'express'
import { login, signup, signin } from '../handlers/auth.controller.js'

var router = express.Router()

router.post("/signup", signup, (req, res) =>{})
router.post("/signin", signin)


router.get("/login", login)

export default router
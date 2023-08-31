import {Router} from 'express'
import * as handlers from '../handlers/handlers.js'
import {upload} from '../config.js'
import validator from '../validators/validator.js'

const postRouter = Router()

// All handlers with post method
postRouter.post('/upload_course', validator('course'), handlers.upload_course)

postRouter.post('/lesson', validator('comment'), handlers.save_comment)

postRouter.post('/update_lesson', validator('lesson'), handlers.update_lesson)

postRouter.post('/upload_data/:id', validator('lesson') ,upload.single('my-video'), handlers.upload_data)

export default postRouter
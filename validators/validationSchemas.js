import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required()
})

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required()
})

const lessonSchema = Joi.object({
  title: Joi.string().min(5).required(),
  postText: Joi.string().min(5).required(),
})

const courseSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
  availableFor: Joi.string().min(2).required()
})

const commentSchema = Joi.object({
  commentText: Joi.string().min(1).required()
})

export default {
  login: loginSchema,
  register: registerSchema,
  lesson: lessonSchema,
  course: courseSchema,
  comment: commentSchema
}
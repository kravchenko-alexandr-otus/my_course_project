import {Comment} from '../models/models.js'

export const findCommentsOfLesson = async (id) => {
    return await Comment.find({lessonId: id}).lean()
}

export const createComment = (obj) => {
    return new Comment(obj)
}
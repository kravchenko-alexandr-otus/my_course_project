import {Lesson} from '../models/models.js'

export const findLessonObjectById = async(id) => {
    return await Lesson.findById(id).lean()
}

export const findLessonDocumentById = async(id) => {
    return await Lesson.findById(id)
}

export const findLessonObject = async(obj) => {
    return await Lesson.findOne(obj).lean()
}

export const findAllLessonsOfCourse = async(obj) => {
    return await Lesson.find(obj).lean()
}

export const createLesson = (obj) => {
    return new Lesson(obj)
}
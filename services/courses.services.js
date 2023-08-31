import {Course} from '../models/models.js'

export const allCoursesObjects = async() => {
    return await Course.find({}).lean()
}

export const findCourseObjectById = async (id) => {
    return await Course.findById(id).lean()
}

export const createCourse = (obj) => {
    return new Course(obj)
}
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import middlewaresParser from './middlewares.js'



const app = express()
middlewaresParser(app)

try {
    mongoose.connect('mongodb://localhost:27017/course_project', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    console.log('Successfully connected to db')
} catch (error){
    console.log(error.message)
}


const port = process.env.PORT || 3000


app.listen(port, () => console.log(`SERVER is up listening on port: ${port}`))
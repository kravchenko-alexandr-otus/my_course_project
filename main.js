import 'dotenv/config'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import * as handlers from './handlers/handlers.js'
import userRoutes from './routes/user.js'
import renders from './routes/renders.js'

import {__dirname} from './config.js'
import multer from 'multer'
import path from 'path'
import verifyToken from './handlers/authJWT.js'



const app = express()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb){
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
        cb(null, file.originalname)
    },
})
const upload = multer({storage:storage})

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

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
        dateFormat: function(date){
            return date.toLocaleDateString('RU')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(userRoutes)
app.use(renders)
app.use(express.static(__dirname + '/public'))



app.get('/signIn', handlers.login)

app.get('/logout', handlers.logout)

app.post('/upload_data/:id', upload.single('my-video'), handlers.upload_data)

app.post('/upload_course', handlers.upload_course)

app.post('/lesson', handlers.save_comment)

app.post('/update_lesson', handlers.update_leson)













const port = process.env.PORT || 3000

















app.listen(port, () => console.log(`SERVER is up listening on port: ${port}`))
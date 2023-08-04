import 'dotenv/config'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import * as handlers from './handlers/handlers.js'
import userRoutes from './routes/user.js'
import renders from './routes/renders.js'

import {fileURLToPath} from 'url'
import { dirname } from 'path'
import multer from 'multer'
import path from 'path'
import verifyToken from './handlers/authJWT.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    },
})
const upload = multer({storage:storage})

try {
    mongoose.connect('mongodb://localhost:27017/course_project', {
        useUnifiedTopology: true,
        useNewUrlParser: true
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



app.get('/courses', verifyToken, handlers.course)

app.get('/signIn', handlers.login)

app.get('/logout', handlers.logout)

app.get('/profile/:username', handlers.profile)

app.get('/create_post', handlers.create_post)

app.post('/upload_data', upload.single('my-video'), (req, res) =>{
    console.log(`Video uploaded: ${req.file.filename}`)
})


// TODO: 
// 1) Complete create_post.handlers
// 2) render create_post.handlers
// 3) Render all posts 
// 4) Make little makeUp













const port = process.env.PORT || 3000

















app.listen(port, () => console.log(__dirname))
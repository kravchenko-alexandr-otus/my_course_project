import 'dotenv/config'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { main, about, blog, teachers, registration, course} from './handlebars/handlers.js'
import userRoutes from './routes/user.js'

import {fileURLToPath} from 'url'
import { dirname } from 'path'
import verifyToken from './handlebars/authJWT.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

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
app.get('/', main)

app.get('/about', about)

app.get('/blog', blog)

app.get('/teachers', teachers)

app.get('/registration', registration)

app.get('/course', verifyToken, course)

app.use(express.static(__dirname + '/public'))




















const port = process.env.PORT || 3000

















app.listen(port, () => console.log(__dirname))
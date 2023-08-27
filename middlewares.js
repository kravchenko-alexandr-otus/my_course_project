import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { __dirname } from './config.js'
import expressHandlebars from 'express-handlebars'
import userRoutes from './routes/user.js'
import postRouter from './routes/routerPost.js'
import renders from './routes/renders.js'
import express from 'express'
import { errorHandler } from './handlers/handlers.js'

export default function middlewaresParser(app){
    // Third-party middlewares
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended:true
    }))
    // Use static files 
    app.use(express.static(__dirname + '/public'))
    // Use handlebars
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
    // Routes
    app.use(userRoutes)
    app.use(postRouter)
    app.use(renders)

    app.use(errorHandler)
} 
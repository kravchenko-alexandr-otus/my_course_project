import {User} from '../models/models.js'


export const main = (req, res) => res.render('main')

export const about = (req, res) => res.render('about')

export const blog = (req, res) => res.render('blog')

export const teachers = (req, res) => res.render('teachers')

export const registration = (req, res) => res.render('registration', {layout:'register.handlebars'})

export const course = (req, res) => res.render('course')

export const login = (req, res) => res.render('login_page')

export const create_post = (req, res) => res.render('create_post')

export const logout = (req, res) => {
    res.cookie('access_token', '')
    res.redirect('/')
}

export const profile = (req, res) => {
    const username = req.params.username
    const user = User.findOne({
        username
    })
    res.render('profile', {layout:'profile'})
}


import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {User} from '../models/models.js'
import 'dotenv/config'

export const signup = (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    user.save()
        .then((user)=> {
            console.log(user.username)
            res.render('main')})
        .catch((err)=> {
            console.log(err)})
}

export const login = (req,res) =>{
    res.render('login_page', {layout:'login'})
}


export const signin = (req,res) => {
    User.findOne({
        email: req.body.email
    }).then( user =>{
        //Comparing passwords
        try{
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )}
        catch {
            return res.render('login_page', {message: 'Wrong EMAIL or PASSWORD'})
        }
        if (!passwordIsValid) {
            return res.render('login_page', {message: 'Wrong EMAIL or PASSWORD'})
        }
        //Signing token with user id
        var token = jwt.sign({
            id:user.id
        },process.env.API_SECRET, {
            expiresIn:86400*1000
        })
        //responding to client request with user access token.
        res.cookie('access_token', token, {
            maxage: 86400*1000
        })
        res.cookie('username', user.username)
        res.redirect(`/profile/${user.username}`)
    }).catch(err => console.log(err))
}


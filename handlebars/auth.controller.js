import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import 'dotenv/config'

export const signup = (req,res) => {
    console.log("PASSWORD", req.body.password)
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
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
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
        res.redirect('/teachers')
    }).catch(err => console.log(err))
}


import jwt from 'jsonwebtoken'
import {User} from  '../models/models.js'

const verifyToken = (req, res, next) =>{
    if (req.cookies && req.cookies.access_token){
        console.log(req.cookies.access_token)
        jwt.verify(req.cookies.access_token, process.env.API_SECRET, function (err, decode){
            if (err) req.cookie =  null
            User.findOne({_id: decode.id})
                .then(user => {
                    res.cookie('username',user.username)
                    res.cookie('email',user.email)    
                    next()})
                .catch(err=>console.log(err))
                })
    }
}

export default verifyToken
import createHttpError from 'http-errors'
import validators from './validationSchemas.js'

export default function(validator) {
    if (!validator.hasOwnProperty(validator)){
        console.log(`'${validator}' validator is not exist`)
    }
    
    return async function(req, res, next) {
        try {
            const validated = await validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi) 
                return next(createHttpError(422, {message: err.message}))
            next(createHttpError(500))
        }
    }


} 

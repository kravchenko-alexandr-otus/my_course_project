import {fileURLToPath} from 'url'
import { dirname } from 'path'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

export {__dirname, upload}
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// ensure uploads directory exists at project root
const uploadsDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir)
    },
    filename: function(req,file,callback){
        const uniqueName = Date.now() + '-' + file.originalname
        callback(null, uniqueName)
    }
})
const upload = multer({storage})

export default upload
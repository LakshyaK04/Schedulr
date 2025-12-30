import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post(
  '/add-doctor',
  upload.single('image'), // MUST be first
  authAdmin,
  addDoctor
)

// TEST: simple unauthenticated upload endpoint to isolate multer behavior
adminRouter.post('/test-upload', upload.single('image'), (req, res) => {
  console.log('TEST REQ BODY:', req.body)
  console.log('TEST REQ FILE:', req.file)
  console.log('TEST CONTENT-TYPE:', req.headers['content-type'])
  console.log('TEST IS MULTIPART:', req.is && req.is('multipart/form-data'))
  res.status(200).json({ success: true, filePresent: !!req.file, body: req.body })
})

adminRouter.post('/login', loginAdmin)

export default adminRouter
import validator from 'validator'
import bcrypt from 'bcrypt'
import { getCloudinary } from '../config/cloudinary.js'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// API for adding doctor
const addDoctor = async (req,res) => {

    try {
        // DEBUG: show what we received (helpful when testing with Postman/form-data)
        console.log('REQ BODY:', req.body)
        console.log('REQ FILE:', req.file)
        console.log('CONTENT-TYPE:', req.headers['content-type'])
        console.log('IS MULTIPART:', req.is && req.is('multipart/form-data'))

        const { name, email, password,speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" })
        }

        //validation strong password
        if (password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long" })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        // uploading image to cloudinary
        console.log('FILE PATH:', imageFile.path)
        const cloudinary = getCloudinary()
        if (cloudinary && cloudinary.__isStub) {
            // friendly 503 response for development when Cloudinary not configured
            console.warn('Upload attempted but Cloudinary is not configured')
            return res.status(503).json({ success: false, message: 'Image upload service is not configured. Please set Cloudinary credentials.' })
        }

        const imageUpload= await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.status(201).json({success: true, message: "Doctor added successfully"})

    } catch (error) {
        // Log richer Cloudinary error details when available
        console.error("Error adding doctor:", error && error.message)
        if (error && error.http_code) console.error('Cloudinary http_code:', error.http_code)
        if (error && error.http_body) console.error('Cloudinary http_body:', error.http_body)
        res.status(500).json({success: false, message: "Internal server error"})
    }

}

//API for admin login

const loginAdmin = async (req,res) => {
    try {
        const { email, password } = req.body

        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
            

            // Sign a token with a payload that includes role so middleware can validate
            const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.json({ success: true, message: "Admin logged in successfully", token })
        } else {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req,res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors:doctors})
    }
    catch(error){

    }
}

export {addDoctor, loginAdmin, allDoctors}
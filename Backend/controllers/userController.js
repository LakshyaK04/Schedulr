import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { getCloudinary } from '../config/cloudinary.js'
import fs from 'fs'

/* ============================
   REGISTER USER
============================ */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'All fields are required' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email address' })
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Password must be at least 8 characters',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      message: 'User registered successfully',
      token,
    })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

/* ============================
   LOGIN USER
============================ */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      message: 'User logged in successfully',
      token,
    })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

/* ============================
   GET USER PROFILE
============================ */
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body

    const userData = await userModel
      .findById(userId)
      .select('-password')

    res.json({
      success: true,
      message: 'User profile data fetched successfully',
      userData,
    })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

/* ============================
   UPDATE USER PROFILE
============================ */
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    const updateData = {}

    if (name) updateData.name = name
    if (phone) updateData.phone = phone
    if (dob) updateData.dob = dob
    if (gender) updateData.gender = gender
    if (address) updateData.address = JSON.parse(address)

    if (Object.keys(updateData).length > 0) {
      await userModel.findByIdAndUpdate(userId, updateData)
    }

    if (imageFile) {
      const cloudinary = getCloudinary()

      if (cloudinary.__isStub) {
        return res.status(503).json({
          success: false,
          message: 'Image upload service not configured',
        })
      }

      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        { resource_type: 'image' }
      )

      fs.unlink(imageFile.path, (err) => {
        if (err) console.error('Failed to delete temp file:', err)
      })

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url,
      })
    }

    res.json({
      success: true,
      message: 'User profile updated successfully',
    })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
}

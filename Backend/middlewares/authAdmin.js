import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.atoken

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied! Login Required',
      })
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized Admin',
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

export default authAdmin


import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
  try {
    // accept token from Authorization: Bearer <token> or custom 'atoken' header
    const authHeader = req.headers.authorization || req.headers.atoken;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Access Denied! Login Required' });
    }

    // normalize token (handle both 'Bearer <token>' and raw token)
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access Denied! Unauthorized Admin' });
    }

    next();
  } catch (error) {
    console.error('authAdmin error:', error.message || error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authAdmin;
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// Authentication middleware
const authMiddleware = (req, res, next) => {
    // const token = req.header('Authorization');
    const cookies = cookie.parse(req.headers.cookie || ''); // Parse cookies from request
    const token = cookies.token; // Retrieve the token from the cookie named "token"
    // if (!token) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }
  
    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.userId = decoded.userId;
        console.log("User ID in AuthMiddleware: ",req.userId)
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
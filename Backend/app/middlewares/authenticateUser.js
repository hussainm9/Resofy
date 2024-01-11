const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(400).json('Token is missing');
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            id: tokenData.id,
            role: tokenData.role
        };
        next();
    } catch (error) {
        //console.error(error); 
        return res.status(401).json('Token is invalid');
    }
};

module.exports = {
    authenticateUser: authenticateUser
};

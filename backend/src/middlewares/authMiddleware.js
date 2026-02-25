import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Akses ditolak, kamu belum login!",
            errors:  null
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next(); 

    } catch (err) {
        res.status(403).json({ 
            success: false, 
            message: "Token tidak sah!",
            errors: null
        });
    }
};



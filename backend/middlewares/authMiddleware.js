import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "No token provided, authorization denied" });
    }


    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
    }
}




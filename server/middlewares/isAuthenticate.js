import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No autorizado" })

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "token invalido" })
        req.user = user.payload;
        next();
    })
}
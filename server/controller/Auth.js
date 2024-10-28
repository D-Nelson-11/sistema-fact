import { pool } from '../database/connection.js'
import { createAccessToken } from '../lib/jwt.js'
import { cryptPassword, matchPassword } from '../lib/helpers.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const register = async (req, res) => {
    try {
        const { Nombres, UserPassword, Correo, IdRol, Apellidos } = req.body;
        const newUser = {
            Nombres,
            UserPassword,
            Correo,
            IdRol,
            Apellidos,
        }
        newUser.UserPassword = await cryptPassword(UserPassword);
        await pool.query('insert into Usuario set ?', [newUser])

        const token = await createAccessToken({ Correo })

        res.cookie('token', token)
        res.json(newUser)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { Correo, UserPassword } = req.body;
        const [user] = await pool.query('select * from Usuario where Correo = ?', [Correo]);

        if (user.length === 0) return res.status(400).json({ message: "Usuario o contraseña incorrecta" })

        const validPassword = await matchPassword(UserPassword, user[0].userPassword);
        if (!validPassword) return res.status(400).json({ message: "Usuario o contraseña incorrecta" });

        if (user[0].Estado === 0) return res.status(400).json({ message: "Usuario inactivo" });

        const token = await createAccessToken({ Id: user[0].Id })
        const [permisos] = await pool.query('select * from Permisos where IdRol = ?', [user[0].IdRol]);

        res.cookie('token', token)
        res.json([user, permisos])


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const logOut = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })

    return res.sendStatus(200);
}

export const verifyToken = async(req, res) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({message:"No estas autorizado"});

    jwt.verify(token, SECRET_KEY, async(err, decoded)=>{ 
        if (err) return res.status(401).json({message:"No estas autorizado"});
        const [user] = await pool.query('select * from Usuario where Id = ?',[decoded.payload.Id]);
        if (!user) return res.json(400).json({message:"Usuario no encontrado"});
        const [permisos] = await pool.query('select * from Permisos where IdRol = ?', [user[0].IdRol]);
        res.json([user, permisos]);
     })
}

export const actualizarPermisos = async(req, res) => {
    const { Id } = req.params;
    try {

        const [user] = await pool.query('select * from Usuario where Id = ?', [Id]);
        const [permisos] = await pool.query('select * from Permisos where IdRol = ?', [user[0].IdRol]);
        console.log(permisos);
        res.json([user, permisos]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


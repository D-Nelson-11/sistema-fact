import { pool } from "../database/connection.js";
import { cryptPassword, matchPassword } from '../lib/helpers.js'


export const getUsuarios = async (req, res) => {
    const query = "SELECT U.Id,U.Nombres,U.Apellidos,U.Estado,R.Rol, U.Correo, R.Id as IdRol FROM Usuario U INNER JOIN ROL R ON R.Id = U.IdRol";
    try {
        const result = await pool.query(query);
        res.json(result[0].map((item) => {
            return {
                Id: item.Id,
                Nombre: item.Nombres + " " + item.Apellidos,
                Correo: item.Correo,
                Rol: item.Rol,
                Estado: item.Estado == 1 ? "Activo" : "Inactivo",
                Nombres: item.Nombres,
                Apellidos: item.Apellidos,
                IdRol: item.IdRol
            }
        }));
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const guardarUsuario = async (req, res) => {
    const query = "INSERT INTO Usuario (Nombres,Apellidos,userPassword,Correo,IdRol) VALUES (UPPER(?),UPPER(?),?,UPPER(?),?)";
    const query2 = "SELECT * FROM Usuario Where Correo = ?";
    const { Nombres, Apellidos, userPassword, Correo, IdRol, Estado } = req.body;
    try {
        const result = await pool.query(query2, [Correo]);
        const hashPassword = await cryptPassword(userPassword);
        if (result[0].length > 0) {
            return res.json({ IsValid: false, message: "El correo ya existe" });
        }
        await pool.query(query, [Nombres, Apellidos, hashPassword, Correo, IdRol, Estado]);
        res.json({ IsValid: true, message: "Usuario guardado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(error);
    }
}

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Usuario WHERE Id = ?";
    try {
        await pool.query(query, [id]);
        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(error);
    }
}

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { Nombres, Apellidos, Correo, IdRol, userPassword, Estado } = req.body;
    const query = "UPDATE Usuario SET Nombres = UPPER(?), Apellidos = UPPER(?), Correo = UPPER(?), IdRol = ?, Estado = ? WHERE Id = ?";
    const query3 = "UPDATE Usuario SET Nombres = UPPER(?), Apellidos = UPPER(?), Correo = UPPER(?), IdRol = ?, userPassword = ?, Estado = ? WHERE Id = ?";
    const query2 = "SELECT * FROM Usuario Where Correo = ? AND Id <> ?";
    try {
        const result = await pool.query(query2, [Correo, id]);
        if (result[0].length > 0) {
            return res.json({ IsValid: false, message: "El correo ya existe" });
        }

        if (userPassword !== "") {
            const hashPassword = await cryptPassword(userPassword);
            await pool.query(query3, [Nombres, Apellidos, Correo, IdRol, hashPassword, Estado, id]);
        } else {
            await pool.query(query, [Nombres, Apellidos, Correo, IdRol, Estado, id]);
        }
        res.json({ IsValid: true, message: "Usuario actualizado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(error);
    }
}

export const insertBitacora = async (req, res) => {
    const { Accion } = req.body; // values es un array que contiene los productos a insertar en la bitácora y el total
    const query = "INSERT INTO Bitacora (Accion) VALUES (?)";
    try {
        await pool.query(query, [Accion]);
        res.json({ IsValid: true, message: "Registro guardado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(error);
    }
}

export const getBitacora = async (req, res) => {
    const query = "SELECT * FROM Bitacora";
    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(error);
    }
};

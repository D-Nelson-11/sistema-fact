import { pool } from "../database/connection.js";

export const GetParametros = async (req, res) => {
    const query = "SELECT * FROM parametros";

    try {
        const result = await (pool.query(query));
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const AddParametro = async (req, res) => {
    const { Descripcion, Valor } = req.body;
    const query = "INSERT INTO parametros (Descripcion, Valor) VALUES (?,?)";

    try {
        await (pool.query(query, [Descripcion, Valor]));
        res.json({ IsValid: true, message: "Registro Agregado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const UpdateParametro = async (req, res) => {
    const { Descripcion, Valor } = req.body;
    const { id } = req.params;
    const query = "UPDATE parametros SET Descripcion = ?, Valor = ? WHERE id = ?";

    try {
        const result = await (pool.query(query, [Descripcion, Valor, id]));
        res.json({ IsValid: true, message: "Registro Actualizado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const DeleteParametro = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM parametros WHERE id = ?";

    try {
        const result = await (pool.query(query, [id]));
        res.json({ message: "Parametro Eliminado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
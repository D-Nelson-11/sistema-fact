import { pool } from "../database/connection.js";

export const GetParametros = async (req, res) => {
    const query = "SELECT * FROM parametros";

    try {
        const result = await (pool.query(query));
        res.json(result[0]);
    } catch (error) {
        res.json({ error: error });
    }
}

export const AddParametro = async (req, res) => {
    const { Descripcion, Valor } = req.body;
    const query = "INSERT INTO parametros (Descripcion, Valor) VALUES (?,?)";

    try {
        await (pool.query(query, [Descripcion, Valor]));
        res.json({ message: "Parametro Agregado" });
    } catch (error) {
        res.json({ error: error });
    }
}

export const UpdateParametro = async (req, res) => {
    const { Nombre, Valor } = req.body;
    const { id } = req.params;
    const query = "UPDATE parametros SET Descripcion = ?, Valor = ? WHERE id = ?";

    try {
        const result = await (pool.query(query, [Nombre, Valor, id]));
        res.json({ message: "Parametro Actualizado" });
    } catch (error) {
        res.json({ error: error });
    }
}

export const DeleteParametro = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM parametros WHERE id = ?";

    try {
        const result = await (pool.query(query, [id]));
        res.json({ message: "Parametro Eliminado" });
    } catch (error) {
        res.json({ error: error });
    }
}
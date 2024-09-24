import { pool } from "../database/connection.js";

export const getObjetos = async (req, res) => {
    const query = "SELECT * FROM objetos";
    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
import { pool } from "../database/connection.js";

export const generarFactura = async (req, res) => {
    const { rows } = req.body;// rows es un array de objetos que contiene los productos a facturar
    const query = "UPDATE inventario SET Cantidad = Cantidad - ? WHERE id = ?";
    const query2 = "SELECT Cantidad FROM inventario WHERE Id = ?";
    try {
        for (let item of rows) {
            const result1 = await pool.query(query2, [item.Id]);
            if (result1[0].length > 0 && result1[0][0].Cantidad < item.Cantidad) {
                return res.json({ IsValid: false, message: "La cantidad excede la existencia" });
            }
            await pool.query(query, [item.Cantidad, item.Id]);
        }
        return res.json({ IsValid: true, message: "Registro Actualizado" });
    } catch (error) {
        res.status(400).json({ error: error });
        console.error(error);
    }
}
import { pool } from "../database/connection.js";

export const generarFactura = async (req, res) => {
    const { rows } = req.body;// rows es un array de objetos que contiene los productos a facturar
    const query = "UPDATE inventario SET Cantidad = Cantidad - ? WHERE id = ?";
    const query2 = "SELECT * FROM inventario WHERE Id = ?";

    if (rows.length === 0) {
        return res.json({ IsValid: false, message: "No hay productos para facturar" });
    }
    for (let item of rows) {
        try {
            const result1 = await pool.query(query2, [item.Id]);
            if (result1[0].length > 0 && result1[0][0].Cantidad < item.Cantidad) {
                return res.json({ IsValid: false, message: `La cantidad solicitada del producto ${result1[0][0].Descripcion} excede la existencia` });
            }
            const [resp] = await pool.query(query, [item.Cantidad, item.Id]);
        } catch (error) {
            return res.json({ IsValid: false, message: "Ha ocurrido un error" });
        }
    }
    return res.json({ IsValid: true, message: "Registro Actualizado" });
}
import { pool } from "../database/connection.js";

export const GetInventario = async (req, res) => {
    const query = "SELECT * FROM inventario";
    try {
        const result = await pool.query(query);
        res.json(result[0].map((item) => {
            return {
                Id: item.Id,
                Cantidad: 1,
                Precio: item.Precio,
                Codigo: item.Codigo,
                Descripcion: item.Descripcion,
                Existencia: item.Cantidad
            }
        }));
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const AddInventario = async (req, res) => {
    const { Cantidad, Precio, Codigo, Descripcion } = req.body;
    const query = "INSERT INTO inventario (Cantidad, Precio, Codigo, Descripcion) VALUES (?,?,?,?)";
    const query2 = "SELECT * FROM inventario WHERE Codigo = ?";
    try {
        const result1 = await pool.query(query2, [Codigo]);
        if (result1[0].length > 0) {
            return res.json({ IsValid: false, message: "El código del item ya existe" });
        }
        const result2 = await pool.query(query, [Cantidad, Precio, Codigo, Descripcion]);
        res.json({ IsValid: true, message: "Registro Agregado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const UpdateInventario = async (req, res) => {
    const { Cantidad, Precio, Codigo, Descripcion,NuevasUnidades } = req.body;
    const { id } = req.params;
    const query = "UPDATE inventario SET Cantidad = Cantidad + ?, Precio = ?, Codigo = ?, Descripcion = ? WHERE id = ?";
    const query2 = "SELECT * FROM inventario WHERE Codigo = ? AND id <> ?";
    try {
        const result1 = await pool.query(query2, [Codigo, id]);
        if (result1[0].length > 0) {
            return res.json({ IsValid: false, message: "El código del item ya existe" });
        }
        const result = await pool.query(query, [NuevasUnidades, Precio, Codigo, Descripcion, id]);
        console.log(result);
        res.json({ IsValid: true, message: "Registro Actualizado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const DeleteInventario = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM inventario WHERE id = ?";
    try {
        const result = await pool.query(query, [id]);
        res.json({ message: "Registro eliminado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}


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
        res.json({ error: error });
    }
}

export const GetProductoById = async (req, res) => {
    const { Codigo } = req.params;
    const query = "SELECT * FROM inventario WHERE Codigo = ?";
    try {
        const result = await pool.query(query, [Codigo]);
        res.json(result[0].map((item) => {
            return {
                Id: item.Id,
                Cantidad: 1,
                Precio: item.Precio,
                Codigo: item.Codigo,
                Descripcion: item.Descripcion
            }
        }));
    } catch (error) {
        res.json({ error: error });
    }
}

export const AddInventario = async (req, res) => {
    const { Cantidad, Precio, Codigo, Descripcion } = req.body;
    const query = "INSERT INTO inventario (Cantidad, Precio, Codigo, Descripcion) VALUES (?,?,?,?)";
    try {
        const result = await pool.query(query, [Cantidad, Precio, Codigo, Descripcion]);
        res.json({ message: "Inventario Agregado" });
    } catch (error) {
        res.json({ error: error });
    }
};

export const UpdateInventario = async (req, res) => {
    const { Cantidad, Precio, Codigo, Descripcion } = req.body;
    const { id } = req.params;
    const query = "UPDATE inventario SET Cantidad = ?, Precio = ?, Codigo = ?, Descripcion = ? WHERE id = ?";
    try {
        const result = await pool.query(query, [Cantidad, Precio, Codigo, Descripcion, id]);
        console.log(result);
        res.json({ message: "Inventario Actualizado" });
    } catch (error) {
        res.json({ error: error });
    }
}

export const DeleteInventario = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM inventario WHERE id = ?";
    try {
        const result = await pool.query(query, [id]);
        res.json({ message: "Inventario Eliminado" });
    } catch (error) {
        res.json({ error: error });
    }
}


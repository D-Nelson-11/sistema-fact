import { pool } from "../database/connection.js";

export const getPermisos = async (req, res) => {
    const query = "SELECT R.Id, OB.Id as IdObjeto, R.Rol, OB.Objeto, PR.PermisoInsercion,PR.PermisoActualizar,PR.PermisoEliminar,PR.PermisoConsultar FROM Permisos PR INNER JOIN Objetos OB ON OB.Id = PR.IdObjeto INNER JOIN Rol R ON R.Id = PR.IdRol WHERE R.Id <> 1 ORDER BY R.ROL ASC ;";

    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const updatePermisos = async (req, res) => {
    const { Id } = req.params;
    const { PermisoInsercion, PermisoActualizar, PermisoEliminar, PermisoConsultar, IdObjeto } = req.body;
    const query = 'UPDATE Permisos SET PermisoInsercion = ?, PermisoActualizar = ?, PermisoEliminar = ?, PermisoConsultar = ? WHERE IdRol = ? and IdObjeto = ?';
    try {
        const result = await pool.query(query, [PermisoInsercion, PermisoActualizar, PermisoEliminar, PermisoConsultar, Id, IdObjeto]);
        res.json({ message: "Permiso actualizado" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
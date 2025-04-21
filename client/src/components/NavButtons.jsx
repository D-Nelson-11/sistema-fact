import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styles from '../public/Buttons.module.css'

function NavButtons() {
  const { logout } = useAppContext();
  return (
    <div className="d-flex h-100" style={{backgroundColor:"#dae0e6", border:"30px solid #0a0a2a", borderRadius:"10px", padding:"20px"}}>
      <Outlet />
      <div style={{marginTop:"150px", width:"15%"}}>
        <Link to="/Parametros" className={styles.btnStyles}>PARÁMETROS</Link>
        <Link to="/Inventario" className={styles.btnStyles}>INVENTARIO</Link>
        <Link to="/Factura" className={styles.btnStyles}>FACTURA</Link>
        <Link to="/Usuarios" className={styles.btnStyles}>USUARIOS</Link>
        <Link to="/Roles" className={styles.btnStyles}>TAREA</Link>
        <Link to="/Permisos" className={styles.btnStyles}>PERMISOS</Link>
        <Link to="/Bitacora" className={styles.btnStyles}>BITÁCORA</Link>
        <Link
        className={styles.btnStyles}
          onClick={() => {
            logout();
          }}>
          SALIR
        </Link>
      </div>
    </div>
  );
}

export default NavButtons;

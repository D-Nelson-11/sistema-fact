import { Routes, Route } from "react-router-dom";
import "./public/App.css";
import Inventario from "./pages/Inventario/Inventario";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Factura from "./pages/Factura/Factura";
import { Toaster } from "sonner";
import Parametros from "./pages/Parametros/Parametros";
import Index from "./Index";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useAppContext } from "./context/AppContext";
import Rol from "./pages/Rol/Rol";
import Permisos from "./pages/Permisos/Permisos";
import Usuarios from "./pages/Usuarios/Usuario";
import Bitacora from "./pages/Bitacora/Bitacora";
import { AllowRoute } from "./AllowRoute";
import Error from "./pages/Error";
import NavButtons from "./components/NavButtons";

function App() {
  const location = useLocation();
  const { logout, user } = useAppContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Routes>
          <Route path="/" element={<Index />} />
        <Route element ={<NavButtons />}>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/Inventario"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 2)
                }>
                <Inventario />
              </AllowRoute>
            }
          />
          <Route
            path="/factura"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 3)
                }>
                <Factura />
              </AllowRoute>
            }
          />
          <Route
            path="/parametros"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 1)
                }>
                <Parametros />
              </AllowRoute>
            }
          />
          <Route
            path="/Roles"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 5)
                }>
                <Rol />
              </AllowRoute>
            }
          />
          <Route
            path="/Permisos"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 4)
                }>
                <Permisos />
              </AllowRoute>
            }
          />
          <Route
            path="/Usuarios"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 6)
                }>
                <Usuarios />
              </AllowRoute>
            }
          />
          <Route
            path="/Bitacora"
            element={
              <AllowRoute
                TienePermiso={
                  user && user[1]?.some((permiso) => permiso.IdObjeto === 7)
                }>
                <Bitacora />
              </AllowRoute>
            }
          />
          <Route path="/error" element={<Error />} />
        </Route>
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        duration={4000}
        closeButton
        toastOptions={{
          style: {
            fontSize: "15px",
          },
        }}
      />
    </>
  );
}

export default App;

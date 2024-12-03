import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'


export const AllowRoute=({TienePermiso, children, redireccionar='/error'})=>{
    if(!TienePermiso){
        return <Navigate to={redireccionar} replace/>
    }
    return children ? children : <Outlet/>

}
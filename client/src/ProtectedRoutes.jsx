import { useAppContext } from "./context/AppContext";
import {Navigate,Outlet} from 'react-router-dom'
import { useEffect } from "react";

export function ProtectedRoutes() {
    const {isAuthenticated,loading} = useAppContext();

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!loading && !isAuthenticated){
        return <Navigate to="/" replace/>
    }
  return <Outlet/>
}
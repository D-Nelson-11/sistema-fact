import { useContext, createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Ha ocurrido un error usando el contexto");
  }
  return context;
};

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookie.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("/verifyToken");
        if (!res.data) {
          console.log("No hay token");
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }

        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  const login = async (body) => {
    try {
      const res = await axios.post(`/login`, body);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      navigate("/Inventario");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ open, handleClose, setRows, rows, logout, login, user, loading, isAuthenticated, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

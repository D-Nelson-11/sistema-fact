import { useContext, createContext, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Ha ocurrido un error usando el contexto");
  }
  return context;
};

export const ContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);

  return (
    <AppContext.Provider value={{ open, handleClose, setRows,rows }}>
      {children}
    </AppContext.Provider>
  );
};

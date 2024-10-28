import React, { useState, useEffect, useRef } from "react";
import styles from "../public/SearchBar.module.css"; // Suponiendo que usas CSS Modules
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "sonner";

const SearchBar = ({ items, setRowsHelp }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const searchBarRef = useRef(null); // Referencia al contenedor de la barra de búsqueda

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si se hace clic fuera del componente, cierra los resultados
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSearchTerm(""); // Cierra la lista de resultados
      }
    };

    // Añadir el evento cuando el componente está montado
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = items.filter(
      (item) =>
        item.Descripcion?.toLowerCase().includes(value) ||
        item.Codigo?.toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className={styles.search_bar} ref={searchBarRef}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.search_input}
      />
      {searchTerm && (
        <ul className={styles.search_results}>
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className={styles.search_item}
              onClick={() => {
                if (item.Existencia === 0) {
                  toast.error("El producto se encuentra agotado");
                  return;
                }
                setRowsHelp(item);
                setSearchTerm("");
              }}
            >
              {item.Descripcion} <br />
              Existencia <FaLongArrowAltRight style={{ color: "black" }} />{" "}
              <span
                style={{
                  color: item.Existencia > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {item.Existencia > 0 ? item.Existencia : "Agotado"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

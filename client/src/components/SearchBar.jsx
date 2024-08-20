import React, { useState } from "react";
import styles from "../public/SearchBar.module.css"; // Suponiendo que usas CSS Modules

const SearchBar = ({ items, setRowsHelp }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = items.filter((item) =>
      item.Nombre.toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className={styles.search_bar}>
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
                setRowsHelp(item);
                setSearchTerm("")
              }}>
              {item.Nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import styles from "./Header.module.css";
import { DarkMode } from "@styled-icons/material/DarkMode";
import { LightMode } from "@styled-icons/material-twotone/LightMode";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className={`${
        darkMode
          ? styles.header__container__light
          : styles.header__container__dark
      }`}
    >
      <div className={styles.title}>
        <p>Simpsons Wiki</p>
      </div>
      <div className={styles.center}>
        <div className={styles.searchbar__container}>
          <label htmlFor="searchInput">Search</label> &nbsp;
          <input type="text" className={styles.searchbar__input} />
        </div>
      </div>
      <div className={styles.right}>
        {darkMode ? (
          <div
            className={styles.darkModeIcon}
            onClick={() => setDarkMode(!darkMode)}
          >
            <DarkMode />
          </div>
        ) : (
          <div
            className={styles.lightModeIcon}
            onClick={() => setDarkMode(!darkMode)}
          >
            <LightMode />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

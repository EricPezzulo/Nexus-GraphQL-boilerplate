import React from "react";
import styles from "./Header.module.css";
import { DarkMode } from "@styled-icons/material/DarkMode";
import { LightMode } from "@styled-icons/material-twotone/LightMode";
import { useSelector, useDispatch } from "react-redux";
import toggleDarkMode from "../Redux/actions/darkModeAction";
const Header = () => {
  const { darkMode } = useSelector((state) => state);
  const dispatch = useDispatch();
  // rest

  const toggleMenu = (e) => {
    e.preventDefault();
    dispatch(toggleDarkMode());
  };
  return (
    <div
      className={`${
        darkMode
          ? styles.header__container__dark
          : styles.header__container__light
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
          <div className={styles.darkModeIcon} onClick={toggleMenu}>
            <DarkMode />
          </div>
        ) : (
          <div className={styles.lightModeIcon} onClick={toggleMenu}>
            <LightMode />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

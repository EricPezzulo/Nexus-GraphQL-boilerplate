import React from "react";
import styles from "./Header.module.css";
import { DarkMode } from "@styled-icons/material/DarkMode";
import { LightMode } from "@styled-icons/material-twotone/LightMode";
import { useRecoilState, atom } from "recoil";
import { useNavigate } from "react-router-dom";

export const darkmodeState = atom({
  key: "darkmodeState",
  default: false,
});
const Header = () => {
  let navigate = useNavigate();
  const [darkmode, setDarkmode] = useRecoilState(darkmodeState);
  const toggleMenu = (e) => {
    setDarkmode((prev) => !prev);
  };
  return (
    <div 
      className={
        darkmode
          ? styles.header__container__dark
          : styles.header__container__light
      }
    >
      <div className={styles.title}>
        <p className={styles.titleText} onClick={()=> {
          navigate(`/`)
        }}>Simpsons Wiki</p>
      </div>
      <div className={styles.center}>
        <div className={styles.searchbar__container}>
          <label htmlFor="searchInput">Search</label> &nbsp;
          <input type="text" className={styles.searchbar__input} />
        </div>
      </div>
      <div className={styles.right}>
        {darkmode ? (
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

import React from "react";
import styles from "../App.module.css";
import CreateUserComponent from "./CreateUserComponent";
import DisplayData from "./DisplayData";
import Header, { darkmodeState } from "./Header";
import { useRecoilValue } from "recoil";

const Home = () => {
  const darkmode = useRecoilValue(darkmodeState);
  return (
    <div
      className={
        darkmode ? styles.app__container__dark : styles.app__container__light
      }
    >
      <Header />
      <DisplayData />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CreateUserComponent />
      </div>
    </div>
  );
};

export default Home;

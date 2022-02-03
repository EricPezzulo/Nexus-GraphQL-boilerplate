import React from "react";
import styles from "../App.module.css";
import CreateUserComponent from "./CreateUserComponent";
import DisplayData from "./DisplayData";
import Header from "./Header";
import {LightMode} from "@styled-icons/material-twotone/LightMode"
const Home = () => {
  return (
    <div className={styles.app__container}>
      <Header />
      <DisplayData />
      <CreateUserComponent />
    </div>
  );
};

export default Home;

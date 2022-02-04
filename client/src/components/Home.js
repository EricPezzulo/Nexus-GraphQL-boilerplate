import React from "react";
import styles from "../App.module.css";
import CreateUserComponent from "./CreateUserComponent";
import DisplayData from "./DisplayData";
import Header, { darkmodeState } from "./Header";
import { useRecoilValue } from "recoil";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const darkmode = useRecoilValue(darkmodeState);
  const { loginWithRedirect } = useAuth0();
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
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default Home;

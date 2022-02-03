import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styles from "./CreateUserComponent.module.css";

const QUERY_ALL_USERS = gql`
  query FetchAllUsers {
    users {
      id
      name
      username
      email
      imageUrl
    }
  }
`;
const CREATE_NEW_USER = gql`
  mutation CreateUser(
    $name: String!
    $username: String!
    $email: String!
    $imageUrl: String!
  ) {
    createUser(
      name: $name
      username: $username
      email: $email
      imageUrl: $imageUrl
    ) {
      name
      username
      email
      imageUrl
    }
  }
`;

const CreateUserComponent = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    imageUrl: "",
  });
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const [mutateUsers] = useMutation(CREATE_NEW_USER);
  const createUser = (e) => {
    if (
      newUser.name.length === 0 &&
      newUser.email.length === 0 &&
      newUser.username.length === 0 &&
      newUser.imageUrl.length === 0
    ) {
      console.log("please fill out all fields");
      return null;
    }
    mutateUsers({
      variables: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        imageUrl: newUser.imageUrl,
      },
      refetchQueries: [{ query: QUERY_ALL_USERS }],
    });
    setNewUser({ name: "", username: "", email: "", imageUrl: "" });
  };
  return (
    <div className={styles.createUserComponent__container}>
      <div className={styles.inputData}>
        <input
          className={styles.inputBar}
          type="text"
          placeholder="NAME"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />

        <input
          className={styles.inputBar}
          type="text"
          placeholder="EMAIL"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        <input
          className={styles.inputBar}
          type="text"
          placeholder="USERNAME"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          className={styles.inputBar}
          type="text"
          placeholder="IMAGE URL"
          value={newUser.imageUrl}
          onChange={(e) => setNewUser({ ...newUser, imageUrl: e.target.value })}
        />
        <button type="button" className={styles.createBtn} onClick={createUser}>
          CREATE USER
        </button>
      </div>
    </div>
  );
};

export default CreateUserComponent;

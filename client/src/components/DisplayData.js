import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import styles from "./DisplayData.module.css";

const QUERY_ALL_USERS = gql`
  query FetchAllUsers {
    users {
      id
      name
      username
      email
    }
  }
`;
const CREATE_NEW_USER = gql`
  mutation CreateUser($name: String!, $username: String!, $email: String!) {
    createUser(name: $name, username: $username, email: $email) {
      name
      username
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      name
    }
  }
`;

function DisplayData() {
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const [mutateUsers] = useMutation(CREATE_NEW_USER);
  const [deleteUserMutation] = useMutation(DELETE_USER);

  if (loading) {
    return (
      <div>
        <p>loading ...</p>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <p>Could not fetch data from the server.</p>
          <i>That means the server is either offline</i>
          <i>or there is an error in the code.</i>
        </div>
      </div>
    );
  }

  const createUser = (e) => {
    if (
      newUser.name.length === 0 &&
      newUser.email.length === 0 &&
      newUser.username.length === 0
    ) {
      console.log("please fill out all fields");
      return null;
    }
    mutateUsers({
      variables: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
      refetchQueries: [{ query: QUERY_ALL_USERS }],
    });
    setNewUser({ name: "", username: "", email: "" });
  };

  const deleteUser = (id) => {
    deleteUserMutation({
      variables: {
        id,
      },
      refetchQueries: [{ query: QUERY_ALL_USERS }],
    });
  };

  if (data) {
    return (
      <div>
        <div>
          {data &&
            data.users.map((user, key) => {
              return (
                <div className={styles.userCard} key={key}>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Username: {user.username}</p>
                  <p>id: {user.id}</p>
                  <div className={styles.userCard_buttonContainer}>
                    <button
                      className={styles.componentDelBtn}
                      onClick={() => deleteUser(user.id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
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
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <button
            type="button"
            className={styles.createBtn}
            onClick={createUser}
          >
            CREATE USER
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayData;

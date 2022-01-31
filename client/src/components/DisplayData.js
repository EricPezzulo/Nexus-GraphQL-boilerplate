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
function DisplayData() {
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const [mutateUsers] = useMutation(CREATE_NEW_USER);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    console.log(error);
  }

  const createUser = (e) => {
    e.preventDefault();
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
          <button className={styles.createBtn} onClick={createUser}>
            CREATE USER
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayData;

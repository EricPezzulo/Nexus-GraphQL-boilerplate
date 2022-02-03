import { gql, useMutation } from "@apollo/client";
import React from "react";
import styles from "./UserCard.module.css";

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      name
    }
  }
`;
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

const UserCard = ({ name, id, username, email, imageUrl }) => {
  console.log(imageUrl);
  const [deleteUserMutation] = useMutation(DELETE_USER);
  const deleteUser = (id) => {
    deleteUserMutation({
      variables: {
        id,
      },
      refetchQueries: [{ query: QUERY_ALL_USERS }],
    });
  };
  return (
    <div className={styles.userCard__container}>
      <div className={styles.top__Card__hero}>
        <div>
          <img
            className={styles.card__image}
            src={imageUrl}
            alt="user avatar"
          />
        </div>
      </div>
      <div className={styles.info__container}>
        <p>Name: {name}</p>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p className={styles.hide__id}>ID: {id}</p>
      </div>
      <div className={styles.userCard_buttonContainer}>
        <button
          className={styles.componentDelBtn}
          onClick={() => deleteUser(id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;

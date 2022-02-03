import { gql, useMutation } from "@apollo/client";
import React from "react";
import { darkmodeState } from "./Header";
import styles from "./UserCard.module.css";
import { useRecoilValue } from "recoil";
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
  const darkmode = useRecoilValue(darkmodeState);

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
    <div
      className={
        darkmode
          ? styles.userCard__container__dark
          : styles.userCard__container__light
      }
    >
      <div
        className={
          darkmode
            ? styles.top__Card__hero__dark
            : styles.top__Card__hero__light
        }
      >
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
      </div>
      <div className={styles.userCard_buttonContainer}>
        <button
          className={
            darkmode
              ? styles.componentDelBtn__dark
              : styles.componentDelBtn__light
          }
          onClick={() => deleteUser(id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;

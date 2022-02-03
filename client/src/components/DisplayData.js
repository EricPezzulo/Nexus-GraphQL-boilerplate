import { gql, useQuery } from "@apollo/client";
import styles from "./DisplayData.module.css";
import UserCard from "./UserCard";

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

function DisplayData() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

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

  if (data) {
    return (
      <div className={styles.displayData__container}>
        {data &&
          data.users.map((user, key) => {
            return (
              <div key={key}>
                <UserCard
                  name={user.name}
                  email={user.email}
                  id={user.id}
                  username={user.username}
                  imageUrl={user.imageUrl}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default DisplayData;

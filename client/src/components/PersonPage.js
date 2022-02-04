import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import Header, { darkmodeState } from './Header';
import styles from './PersonPage.module.css'
const FETCH_USER = gql`
query FetchUser($userId: String!) {
  findUser(id: $userId) {
    id 
    name
    username
    email
    imageUrl
  }
}
` 


const PersonPage = () => {
    let {userId} = useParams()
    const darkmode = useRecoilValue(darkmodeState)
    const { data, loading, error } = useQuery(FETCH_USER, {
      variables: {userId}
    });
    if (error) {
      console.log(error);
      return(
        <div>
          error loading page
        </div>
      )
    }
    if(loading) return <div>loading</div>

    if(data){
      return (
      <div className={darkmode? styles.PersonPage__container__dark : styles.PersonPage__container__light}>  
      <Header /> 
         <div className={styles.image__container}>
            <img src={data.findUser[0].imageUrl} alt="user image"/>
         </div>     
          <p>{data.findUser[0].name}</p>
          <p>{data.findUser[0].email}</p>
          <p>{data.findUser[0].username}</p> 
    </div>
     )
    }

  
};

export default PersonPage;

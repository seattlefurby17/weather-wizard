import React from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';


const Home = ({redirect}) => {
if (redirect === true) {
  return (<Redirect to={{pathname: "/temperature"}}/>)
} else {
  return (
  <div className='container'>
    <div className='home-page app'>
      <h3>Your home to the most trusted weather temperature and forecast</h3>
    </div>
  </div>
  )
  }
};

export default Home;
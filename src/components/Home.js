import React from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';

const [redirect, setRedirect] = useState(false);
const Home = () => (
  <div className='container'>
    <Redirect to={{pathname: "/temperature", state: { from: props.location } }}/>
    <div className='home-page app'>
      <h3>Your home to the most trusted weather temperature and forecast</h3>
    </div>
  </div>
  
);

export default Home;
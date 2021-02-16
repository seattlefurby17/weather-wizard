import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LocationSearchForm from './components/LocationSearchForm';
import Container from 'react-bootstrap/Container';


let BASE_URL =''
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  BASE_URL ="http://localhost:5000/"
} else {
  BASE_URL= "https://flask-backend-solo.herokuapp.com/"
}

function App() {

  const [location, setLocation] = useState(null);
  const onLocationPicked = (currentCity) => {
    setLocation(currentCity)
  }

  const tagUrl ='https://seattlefurby17.github.io/weather-wizard';

  return (
    <Container className="App">
      <header className="App-header">
      <div className='weather-box'>
          <div className='temp'>
            <LocationSearchForm searchCurrentCityCallBack={ onLocationPicked } />
            <Navigation />
            <Main location={ location } baseUrl={ BASE_URL } />
          </div>
        </div>
      </header>
      <div class="footer">
        <a href={tagUrl}> Copyright</a>
        <a href={tagUrl}>All Rights Reserved</a>
        <a href={tagUrl}>Terms of Uses</a>
        <a href={tagUrl}>HanhSolo</a>
      </div>
    </Container>
  );
}

export default App;

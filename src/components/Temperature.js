import React, { useState, useEffect } from 'react';

const Temperature = ({location, baseUrl}) => {
  const TEMPERATURE_URL = baseUrl + 'temperature?currentCity='
  const[result, setResult] = useState(null);
  const[errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    // if there is no location, exit
    if (!location) {return}  

    fetch(TEMPERATURE_URL + location,  { method: 'get', mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        if(result.cod === 200) {
          setErrorMsg(null);
          setResult(result);
        } else {
          setResult(null);
          setErrorMsg(result.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log(error.message);
      });
  }, [location, TEMPERATURE_URL]);

  const dateBuilder= (data) => {
    let months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 
      'August', 'September', 'October', 'November', 'December'
    ];
    let days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    let day = days[data.getDay()];
    let date = data.getDate();
    let month = months[data.getMonth()];
    let year = data.getFullYear();

    return `${day} ${month} ${date} ${year}`
  } 

  // if there is a location, display and vice versa
  const locationDisplay = result && (
    <div>
        <p>{dateBuilder(new Date())}</p>
        <p> {result.name}, {result.sys.country}</p>
        {result.weather.length && (
          <p>{result.weather[0].main}</p>
        )}
    </div>
  );

  const currentTemperature = result ? result.main.temp : 0;
  // const weatherCondition = (result && result.weather.length) && result.weather[0].main
  // let weatherClass = (currentTemperature > 50) ? 'app-autumn' : 'app'
  
  // if (weatherCondition === 'Clouds') {
  //   weatherClass = 'app-spring'
  // } else if (weatherCondition === 'Clear') {
  //   weatherClass = 'app-summer'
  // }
  let weatherClass = 'app';
  if (currentTemperature > 45 ) {
    weatherClass = 'app-spring'
  } else if (currentTemperature > 75) {
    weatherClass = 'app-summer'
  } else {
    weatherClass = 'app-autumn'
  }

  return(
    <main>
      <div className={weatherClass}>
        <div className='weather-box'>
        { errorMsg ? <div><h2 className='error-msg'>{errorMsg}</h2></div> : `${Math.round(currentTemperature)}ºF` }
        </div>
      </div>
      <div className='location-box'>
        <div className='location'> 
          {locationDisplay}
        </div>
      </div>
    
    </main>
  );
}

export default Temperature;

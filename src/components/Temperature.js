import React, { useState, useEffect, useCallback } from 'react';
import 'weather-icons/css/weather-icons.css';


const Temperature = ({location, baseUrl}) => {
  const TEMPERATURE_URL = baseUrl + 'temperature?currentCity='
  const[result, setResult] = useState(null);
  const[errorMsg, setErrorMsg] = useState(null);
  
  const weatherBuilder = useCallback((result) => {
    if (!result) {
      return {}
    }
    const weather = { 
      city: result.name,
      country: result.sys.country,
      icon: (result.weather.length > 0) && (result.weather[0].id),
      main: (result.weather.length > 0) && (result.weather[0].main),
      temp: result.main.temp, 
      temp_max: result.main.temp_max,
      temp_min: result.main.temp_min,
      description: (result.weather.length > 0) && (result.weather[0].description),
    };
    return weather
  }, []);
  
  useEffect(() => {
    
    // if there is no location, exit
    if (!location) {return}  

    fetch(TEMPERATURE_URL + location,  { method: 'get', mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        if(result.cod === 200) {
          setErrorMsg(null);
          console.log(result);
          setResult(weatherBuilder(result));
          console.log(weatherBuilder(result));
        } else {
          setResult(null);
          setErrorMsg(result.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log(error.message);
      });
  },[location, TEMPERATURE_URL, weatherBuilder] );
  
  
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
        <p> {result.city}, {result.country}</p>
        <p>{result.main}</p>
    </div>
  );


  function maxminTemp(min, max) {
    if (max && min) {
      return (
        <h4>
          <span className="px-4">L: {Math.round(min)}ºF</span>
          <span className="px-4">H: {Math.round(max)}ºF</span>
        </h4>
      );
    }
  }
  
  const currentTemperature = result ? result.main.temp : 0;

  let weatherClass;
  if (currentTemperature > 45 ) {
    weatherClass = 'app-spring'
  } else if (currentTemperature > 75) {
    weatherClass = 'app-summer'
  } else {
    weatherClass = 'app-autumn'
  }

  if (result === null) { 
    return  ( 
        <div>Loading...</div> 
    )
  }

  return(
    <main>
      <div className='location-box'>
        <div className='location'> 
          {locationDisplay}
        </div>
      </div>
      <i className={`wi wi-owm-${result.icon}`}></i>
      <div className={weatherClass}>
        <div className='weather-box'>
          <h3>
            { errorMsg ? <div><h2 className='error-msg'>{errorMsg}</h2></div> : `${Math.round(result.temp)}ºF`}
          </h3>
          <div>{maxminTemp(result.temp_min, result.temp_max)}</div>
        </div>
      </div>
    </main>
  );
}

export default Temperature;

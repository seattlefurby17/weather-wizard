import React, {useState, useEffect } from 'react';
import axios from 'axios';

// The location being passed in from App.js as an object-result from the user input
const Forecast = ({location, baseUrl}) => {
  const FORECAST_URL = baseUrl + 'forecast?currentCity='

  const [forecast, setForecast] = useState([]);
  const[errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // if there is no location, exit
    if (!location) {return}

    axios(FORECAST_URL + location,  { method: 'get', mode: 'cors'})
      .then((result) => {
        if(parseInt(result.data.cod) === 200) {
          setErrorMsg(null);
          setForecast(result.data.list);
        } else {
          setForecast([]);
          setErrorMsg(result.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log(error.message);
      });
  }, [location, FORECAST_URL]);

  // if there is a location, display and vice versa
  if (forecast.length === 0) { 
    return  ( 
       errorMsg ? <div><h2 className='error-msg'>{errorMsg}</h2></div> : <div>Loading...</div> 
    )
  }

  const intervals = 8
  const arraysMaxMin = []

  for (let i = 0; i < forecast.length; i++) {
    const day = Math.floor(i/intervals)
    // reset the temp for the day
    if (day === arraysMaxMin.length){
      const forecastDate =  new Date(forecast[i].dt_txt)
      arraysMaxMin.push({max_temp: -1000, min_temp: 1000, date:forecastDate})
    }

    const currentMinTemperature =  forecast[i].main.temp_min;
    const currentMaxTemperature = forecast[i].main.temp_max;

    if (currentMaxTemperature > arraysMaxMin[day].max_temp){
      arraysMaxMin[day].max_temp = currentMaxTemperature
    }
    if (currentMinTemperature < arraysMaxMin[day].min_temp){
      arraysMaxMin[day].min_temp = currentMinTemperature
    }

  }

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

    return `${day} ${date} ${month} ${year}`
  } 

  const forecastDisplay = arraysMaxMin.map((dailyForecast, index) => (
    <div key={index}>
      <p>{dateBuilder(dailyForecast.date)} </p>
      <p>{Math.round(dailyForecast.max_temp)}ºF</p>
      <p>{Math.round(dailyForecast.min_temp)}ºF</p>
    </div>
  ));

 
  const weatherCondition = (forecast?.length && forecast[0].weather?.length) && forecast[0].weather[0].main
  let forecastClass = (forecast?.length && forecast[0].main.temp> 50) ? 'app-spring' : 'app'
  if (weatherCondition === 'Clouds') {
    forecastClass = 'app-windy'
  }

  return(
    <main>
      <div className={forecastClass}>
        { forecastDisplay }
      </div>
      <div className='location-box'>
        <div className='location'> 
       
        </div>
      </div>
    
    </main>
  );

}

export default Forecast;
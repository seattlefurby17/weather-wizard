import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import './Forecast.css';
import 'weather-icons/css/weather-icons.css';

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
       errorMsg ? <div><h2 className='error-msg'>{errorMsg}</h2></div> : <div>Please enter a city to begin......</div> 
    )
  }

  const intervals = 8
  const arraysMaxMin = []

  for (let i = 0; i < forecast.length; i++) {
    const day = Math.floor(i/intervals)
    // reset the temp for the day
    if (day === arraysMaxMin.length){
      const forecastDate =  new Date(forecast[i].dt_txt)
      const weatherIcon =  forecast[i].weather[0].id
      arraysMaxMin.push({max_temp: -1000, min_temp: 1000, date:forecastDate, icon: weatherIcon})
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
    <Row md={1} xs={2} className='daily-forecast' key={index}> 
        <Col>{dateBuilder(dailyForecast.date)} </Col>
        <Col><i className={`wi wi-owm-${dailyForecast.icon}`}></i></Col>
        <Col>H: {Math.round(dailyForecast.max_temp)}ºF</Col>
        <Col>L: {Math.round(dailyForecast.min_temp)}ºF</Col>
    </Row>
  ));

  const currentTemperature = (forecast?.length && forecast[0].weather?.length) && forecast[0].main.temp
  let forecastClass;

  if (currentTemperature < 40) {
    forecastClass = 'app';
  }else if (currentTemperature > 40 && currentTemperature < 60) {
    forecastClass = 'app-spring';
  } else if (currentTemperature > 60 && currentTemperature < 70) {
    forecastClass = 'app-autumn';
  } else {
    forecastClass ='app-summer';
  }

  return(
    <Container fluid className={forecastClass}>
      { forecastDisplay }
    </Container>
  );

}

export default Forecast;
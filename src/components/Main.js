import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Temperature from './Temperature';
import Forecast from './Forecast';

const Main = ({location, baseUrl}) => {
  const [redirect, setRedirect] = useState(false);
  
  return (
  <Switch>
    <Route exact path='/'>
      <Home redirect={redirect} />
    </Route>
    <Route exact path='/temperature'>
      <Temperature location={location} baseUrl={baseUrl} setRedirect = {setRedirect}/>
    </Route>
    <Route exact path='/forecast' >
      <Forecast location={location} baseUrl={baseUrl}  />
    </Route>
  </Switch>
  )
};

export default Main;
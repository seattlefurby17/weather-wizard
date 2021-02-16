import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Temperature from './Temperature';
import Forecast from './Forecast';

const Main = ({location, baseUrl}) => (

  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/temperature'>
      <Temperature location={location} baseUrl={baseUrl} />
    </Route>
    <Route exact path='/forecast' >
      <Forecast location={location} baseUrl={baseUrl}  />
    </Route>
  </Switch>
);

export default Main;
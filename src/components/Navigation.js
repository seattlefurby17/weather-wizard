import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName='current' to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName='current' to='/temperature'>Temperature</NavLink></li>
      <li><NavLink exact activeClassName='current' to='/forecast'>Forecast</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;
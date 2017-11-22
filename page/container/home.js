import React from 'react';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="container-home">
        home
        <ul>
          <li>菜单</li>
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          <li>
            <NavLink to="/contact">contact</NavLink>
          </li>
          <li>
            <NavLink to="/about">about</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
import React from 'react';
import { NavLink } from 'react-router-dom';

class About extends React.Component {
  render() {
    return (
      <div className="container-about">
        about us!
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

export default About;
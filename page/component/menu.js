import React from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends React.Component {

  render() {
    return (
      <ul className="component-menu">
        <li>
          <NavLink
            exact
            to="/"
            activeClassName="active-link"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            activeClassName="active-link"
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            activeClassName="active-link"
          >
            About
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default Menu;

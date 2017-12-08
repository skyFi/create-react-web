import React from 'react';
import { fetchData, reduxConnect } from 'react-web-helper';
import config from '../../core/common/config';

@reduxConnect()
@fetchData()
class About extends React.Component {
  render() {
    return (
      <div className="container-about">
        <h1>About Us</h1>
        <img src={`${config.cdn}/images/logo.png`} alt="avatar" />
      </div>
    );
  }
}

export default About;

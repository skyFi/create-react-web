import React from 'react';
import { fetchData, Helmet } from 'react-web-helper';

@fetchData()
class Contact extends React.Component {

  render() {
    return (
      <div className="container-contact">
        <Helmet>
          <title>Contact title from page component</title>
          <meta name="keywords" content="create-react-web" />
          <meta name="description" content="create-react-web" />
        </Helmet>
        <h1>Contact: fyl_2525@163.com</h1>
      </div>
    );
  }
}

export default Contact;

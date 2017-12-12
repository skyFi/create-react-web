## page container

### Example

```JavaScription
import React from 'react';
import { fetchData } from 'react-web-helper';

@fetchData() // must has it.
class Contact extends React.Component {

  render() {
    return (
      <div className="container-contact">
        <h1>Contact: fyl_2525@163.com</h1>
      </div>
    );
  }
}

export default Contact;

```

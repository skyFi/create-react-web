import React from 'react';
import { Switch } from 'react-router-dom';
import connect from 'react-router4-redux';
import { renderRoutes } from 'react-router-config';
import Menu from '../component/menu';
import routes from '../../core/router/index';

class Index extends React.Component {

  render() {
    return (
      <div className="container-home">
        <Menu />

        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </div>
    );
  }
}

export default connect()(Index);

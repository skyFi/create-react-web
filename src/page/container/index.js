import React from 'react';
import { Switch } from 'react-router-dom';
import { reduxConnect, withRouter } from 'react-web-helper';
import { renderRoutes } from 'react-router-config';
import Menu from '../component/menu';
import routes from '../../core/router/index';

@withRouter() // 当有 renderRoutes 的时候，这个必须放在最外层，否则页面路由切换不过来
@reduxConnect()
class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      lastUrl: undefined
    };
  }

  componentDidMount() {
    // subscribe state change
    this.unsubscribe = $store.subscribe(() => {
      // update title, keywords, description
      this.updateData();
    });
  }

  componentDidUpdate() {
    if (this.state.lastUrl !== location.href) {
      this.setState({ // eslint-disable-line
        lastUrl: location.href,
      });
      window.scrollTo(0, 0); // scroll to top when router changed.

      // do something when router changed.
      this.updateData();
    }
  }

  componentWillUnmount() {
    // unsubscribe
    this.unsubscribe instanceof Function && this.unsubscribe();
  }

  updateData() {
    // do something when page update.
  }

  render() {
    return (
      <div className="container-index">
        <Menu />

        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </div>
    );
  }
}

export default Index;

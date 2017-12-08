import React from 'react';
import { Switch } from 'react-router-dom';
import { reduxConnect, withRouter } from 'react-web-helper';
import { renderRoutes } from 'react-router-config';
import matchPath from '../../core/lib/match_path';
import Menu from '../component/menu';
import routes from '../../core/router/index';
import config from '../../core/common/config';

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
      this.updateTDK();

      // do something when redux state changed.
      // ...
    });
  }

  componentDidUpdate() {
    if (this.state.lastUrl !== location.href) {
      this.setState({ // eslint-disable-line
        lastUrl: location.href,
      });
      window.scrollTo(0, 0); // scroll to top when router changed.

      // do something when router changed.
      this.updateTDK();
    }
  }

  componentWillUnmount() {
    // unsubscribe
    this.unsubscribe instanceof Function && this.unsubscribe();
  }

  // smart update title, keywords, description
  updateTDK() {
    const matchRoutes = routes.filter(route => matchPath(this.props.location.pathname, route));
    if (matchRoutes && matchRoutes.length > 0) {
      const matchRoute = matchRoutes[0];
      // update title
      if (matchRoute.title instanceof Function) {
        document.title = matchRoute.title($store.getState());
      } else {
        document.title = matchRoute.title || config.appName || location.hostname;
      }
      // update keywords
      if (matchRoute.keywords instanceof Function) {
        document.querySelector('meta[name=keywords]').content = matchRoute.keywords($store.getState());
      } else {
        document.querySelector('meta[name=keywords]').content = matchRoute.keywords || config.defaultKeywords || location.hostname;
      }
      // update description
      if (matchRoute.description instanceof Function) {
        document.querySelector('meta[name=description]').content = matchRoute.description($store.getState());
      } else {
        document.querySelector('meta[name=description]').content = matchRoute.description || config.defaultDescription || location.hostname;
      }
    }
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

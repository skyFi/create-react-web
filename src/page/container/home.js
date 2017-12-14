import React from 'react';
import { fetchData, reduxConnect, withRouter, Helmet } from 'react-web-helper';
import { fetchUser, fetchFavorites } from '../../core/action/home';
import Tipbulb from '../icon/tip-bulb';

@withRouter()
@fetchData()
@reduxConnect(
  state => ({
    user: state.user,
    favorites: state.favorites,
  })
)
class Home extends React.Component {

  // fetch data in server or browser did mount
  static async fetchData({ dispatch, match, req }) {
    // params `server` only in server rending. server = req;
    await dispatch(fetchUser());
    await dispatch(fetchFavorites());
  }

  render() {
    const { user = {}, favorites = [] } = this.props;
    return (
      <div className="container-home">
        <Helmet>
          <title>{`${user.username} home!`}</title>
          <meta name="keywords" content={`${user.username}， ${favorites.join('，')}`} />
          <meta name="description" content="description from page component." />
        </Helmet>
        <h1><Tipbulb /> Home !</h1>
        <h2>{`hi, ${user.username}, your favorite list:`}</h2>
        <ul className="favorite-list-box">
          {
            (favorites || []).map(d => <li key={d}>{d}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default Home;

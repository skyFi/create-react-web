import React from 'react';
import connect from 'react-router4-redux';
import { fetchUser, fetchFavorites } from '../../core/action/home';
import Tipbulb from '../icon/tip-bulb';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // fetch data in server or browser did mount
  async fetchData(dispatch, match, server) {
    // params `server` only in server rending. server = req;
    await dispatch(fetchUser());
    await dispatch(fetchFavorites());
  }

  render() {
    const { user = {}, favorites = [] } = this.props;
    return (
      <div className="container-home">
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

export default connect(
  state => ({
    user: state.user,
    favorites: state.favorites,
  })
)(Home);

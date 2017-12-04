import React from 'react';
import connect from 'react-router4-redux';
import { fetchUsers } from '../../core/action/home';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // fetch data in server or browser did mount
  fetchData(dispatch, match, store) {
    // params `store` only in server rending.
    dispatch(fetchUsers(match));
  }

  render() {
    const { homeData = {} } = this.props;
    return (
      <div className="container-home">
        <h1>Home</h1>
        <h2>{`hi, ${homeData.username}, your favorite list:`}</h2>
        <ul className="favorite-list-box">
          {
            (homeData.favoriteList || []).map(d => <li key={d}>{d}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    homeData: state.homeData
  })
)(Home);

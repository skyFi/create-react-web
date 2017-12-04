// reducer
export const fetchUsers = (match) => (dispatch) => {
  dispatch({
    type: 'whatever_you_want',
    _key: 'homeData',
    _value: {
      username: 'skylor min',
      favoriteList: [
        'Apple',
        'DotA2',
        'JavaScript',
        'You'
      ]
    }
  });
};

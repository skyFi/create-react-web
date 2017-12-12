// reducer
export const fetchUser = () => async (dispatch, getState) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: 'fetch/user',
        _key: 'user',
        _value: {
          id: 1,
          username: 'skylor min',
        }
      });
      resolve();
    }, 500);
  });
};

export const fetchFavorites = () => async (dispatch, getState) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(dispatch({
        type: 'fetch/favorites',
        _key: 'favorites',
        _value: [
          'Apple',
          'DotA2',
          'JavaScript',
          'You'
        ]
      }));
    }, 500);
  });
};

import config from '../common/config';

export default function (state = {}, action) {
  if (action.err) {
    state.err = action.err;
  }
  if (action._key) {
    return Object.assign({}, state, {
      [action._key]: action._value
    });
  } else {
    switch (action.type) {
      // ... some other actions
      default:
        return state;
    }
  }
}

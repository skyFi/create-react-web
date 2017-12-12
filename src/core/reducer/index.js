export default function (state = {}, { err, type, _key, _value, ...rest }) {
  if (err) {
    state.err = err;
  }
  if (_key) {
    return Object.assign({}, state, {
      [_key]: _value
    });
  } else {
    switch (type) {

      // server side rending init state.
      case 'server_side/init_state':
        return Object.assign({}, state, rest);

      // some other actions
      // ...

      default:
        return state;
    }
  }
}

## 添加自定义mixin

* 如果不需要的话,可以将这个文件夹删除,不影响其他使用。

### Define

定义简单例子:
```JavaScript
// add mixin
export default {
  componentDidMount() {
    // do something.
  },

  componentDidUpdate() {
    // do something.
  },

  // other funcs
};
```

### Usage

然后在需要添加的pages文件中如下添加,需要引入`react-router4-redux`来绑定。
```JavaScript

// ...
import connect from 'react-router4-redux';
import someMixin1  from '../../core/mixin/example1';
import someMixin2  from '../../core/mixin/example2';

class Example extends React.Component {

  render() {
    return (
      <div>
        hey
      </div>
    );
  }
}

export default connect()(Example, someMixin1, someMixin2 /*, ... mixin list*/);

```

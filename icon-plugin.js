'use strict';

const through = require('through-gulp');
const camelCase = require('lodash/camelCase');
const capitalize = require('lodash/capitalize');

// exporting the plugin
module.exports = iconGeneration;

function iconGeneration() {
  // creating a stream through which each file will pass
  return through(function(file, encoding, callback) {
    const html = file.contents.toString('utf-8');
    const filename = file.history[0] ? file.history[0].replace(/(.*\/)*([^.]+).*/ig, '$2') : 'unknown';

    const svg = html
      .replace(/<svg /ig, '<svg className={className} {...restProps} ')
      .replace(/<!--.*-->\n/ig, '')
      .replace(/<\?xml.*?>\n/ig, '')
      .replace(/xmlns:xlink.*xlink"/ig, '')
      .replace(/<title>.*<\/title>\n/ig, '')
      .replace(/<desc>.*<\/desc>\n/ig, '')
      .replace(/<defs>.*<\/defs>\n/ig, '\n')
      .replace(/([a-zA-Z])-([a-zA-Z])/ig, (a, b, c) => {
        return `${b}${c.toUpperCase()}`;
      })
      .replace(/ +/ig, ' ')
      .replace(/ *</ig, '<')
      .replace(/\n+/ig, '');

    const icon =
`import React from 'react';

class ${capitalize(camelCase(filename))} extends React.Component {
  render() {
    const { className, ...restProps } = this.props;
    return (
      ${svg}
    );
  }
}

export default ${capitalize(camelCase(filename))};

`;
    file.contents = new Buffer(icon);
    this.push(file);
    callback();
  }, (callback) => {
    // just pipe data next, just callback to indicate that the stream's over
    callback();
  }, 16);
}

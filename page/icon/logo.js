import React from 'react';

class Logo extends React.Component {
  render() {
    const { className, ...restProps } = this.props;
    return (
      <svg className={className} {...restProps} width="102px" height="102px" viewBox="0 0 102 102" version="1.1" xmlns="http://www.w3.org/2000/svg" > <g id="1.2.0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="iPhone-8" transform="translate(-63.000000, -72.000000)"><g id="Group" transform="translate(64.000000, 73.000000)"><circle id="Oval-2" stroke="#0080DC" cx="50" cy="50" r="50"></circle><polygon id="Triangle-2" stroke="#0080DC" points="50.5 1 90 80 11 80"></polygon><polygon id="Triangle-2" stroke="#0080DC" transform="translate(50.500000, 59.500000) scale(1, -1) translate(-50.500000, -59.500000) " points="50.5 20 90 99 11 99"></polygon><text id="F" fontFamily="AmericanTypewriterSemibold, American Typewriter" fontSize="36" fontWeight="500" fill="#0080DC"><tspan x="39" y="62">F</tspan></text></g></g></g></svg>
    );
  }
}

export default Logo;


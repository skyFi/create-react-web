import React from 'react';

class Male extends React.Component {
  render() {
    const { className, ...restProps } = this.props;
    return (
      <svg className={className} {...restProps} width="11px" height="11px" viewBox="0 0 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg" > <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="iPhone-8" transform="translate(-167.000000, -84.000000)" stroke="#64C3FF" strokeWidth="1.2"><g id="cells/表---个人信息" transform="translate(0.000000, 64.000000)"><g id="Group" transform="translate(166.000000, 18.000000)"><circle id="Oval" cx="5" cy="9" r="3"></circle><path d="M7.5,6.5 L10.5,3.5" id="Line" strokeLinecap="square"></path><polyline id="Path-2" strokeLinecap="round" points="7 3 11 3 11 7"></polyline></g></g></g></g></svg>
    );
  }
}

export default Male;


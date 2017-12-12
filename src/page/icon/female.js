import React from 'react';

class Female extends React.Component {
  render() {
    const { className, ...restProps } = this.props;
    return (
      <svg className={className} {...restProps} width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" > <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="iPhone-8" transform="translate(-111.000000, -147.000000)" stroke="#FFA8B2" strokeWidth="1.2"><g id="cells/表---个人信息-copy-6" transform="translate(0.000000, 128.000000)"><g id="Group" transform="translate(110.000000, 18.000000)"><circle id="Oval" cx="8.5" cy="5.5" r="3.5"></circle><path d="M6.03553391,7.96446609 L2,12" id="Line" strokeLinecap="round"></path><path d="M2.5,8.5 L5.5,11.5" id="Line-2" strokeLinecap="round"></path></g></g></g></g></svg>
    );
  }
}

export default Female;


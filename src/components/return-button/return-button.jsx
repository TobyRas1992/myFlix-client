import React from 'react';

export class ReturnButton extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onClick } = this.props;
    return <button onClick={() => onClick()} className="return-button">Return to main page</button>
  }
}
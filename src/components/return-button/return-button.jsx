import React from 'react';

export class ReturnButton extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onReturnClick } = this.props;
    return <button onClick={() => onReturnClick()} className="return-button">Return to main page</button>
  }
}
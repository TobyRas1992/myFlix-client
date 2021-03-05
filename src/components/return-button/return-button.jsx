import React from 'react';

export class ReturnButton extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onReturnClick } = this.props;
    return <div onClick={() => onReturnClick()} className="return-button">Return to main page</div>
  }
}
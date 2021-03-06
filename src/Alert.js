import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      fontSize: '13px'
    };
  }

  render() {
    return (
      <div className="Alert">
        <p className='alert-message' style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }
}

class OfflineAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";

  } getStyle = () => {
    return {
      color: this.color,
      fontStyle: 'italic',
    };
  }
}


export {InfoAlert, ErrorAlert, WarningAlert, OfflineAlert};

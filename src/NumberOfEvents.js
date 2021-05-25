import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 5,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents('', value);
    this.setState({
      numberOfEvents: value,
    });
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <label htmlFor='numberOfEvent'>Number of Events</label>
        <input
          type='number'
          className='event-number-input'
          placeholder='Enter Number of Events to display'
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  } 
}

export default NumberOfEvents;
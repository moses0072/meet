import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import {  getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import Login from './login';



class App extends Component {
 
  state = {
   events: [],
   locations: [],
   numberOfEvents: 32,
   tokenCheck: false,
   currentLocation: "all"   
 }

 async componentDidMount() {
  this.mounted = true;
  const accessToken = localStorage.getItem('access_token');
  const isTokenValid = (await checkToken(accessToken)).error ? false :
    true;
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  this.setState({ showWelcomeScreen: !(code || isTokenValid) });
  if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }
}


componentWillUnmount() {
  this.mounted = false;
}

  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      if (location === 'all' && eventCount === 0) {
        locationEvents = events;
      } else if (location !== 'all' && eventCount === 0) {
        locationEvents = events.filter((event) => event.location === location);
      } else if (location === '' && eventCount > 0) {
        locationEvents = events.slice(0, eventCount);
      } else if (location === '' && eventCount === '') {
        locationEvents = events;
      }
      this.setState({
       events: locationEvents,
       numberOfEvents: eventCount
      });
    });
  };

  render() {
    const { locations, numberOfEvents, events, tokenCheck } = this.state;
    return tokenCheck === false ? (
      <div className="App">
        <Login  />
      </div>
    ) : (  
      <div className='App'>
        <h1>Meet App</h1>
        <CitySearch locations={locations} updateEvents={this.updateEvents} numberOfEvents={numberOfEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;

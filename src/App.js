import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, checkToken } from './api';
import './nprogress.css';
import Login from './login';



class App extends Component {
 
  state = {
   events: [],
   locations: [],
   numberOfEvents: 32, 
   tokenCheck: false,
   
 }

 async componentDidMount() {
  const accessToken = localStorage.getItem("access_token");
  const validToken = accessToken !== null  ? await checkToken(accessToken) : false;
  this.setState({ tokenCheck: validToken });
  if(validToken === true) this.updateEvents()
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  this.mounted = true;
  if (code && this.mounted === true && validToken === false){ 
    this.setState({tokenCheck:true });
    this.updateEvents();
  }
}

componentWillUnmount(){
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
  }

  render() {
    const { locations, numberOfEvents, events, tokenCheck } = this.state;
    return tokenCheck === false ? (
      <div className="App">
        <Login showLogin={this.state.showLogin} />
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

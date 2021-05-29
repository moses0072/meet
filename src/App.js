import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken } from './api';
import Login from "./Login";
class App extends Component {
 
  state = {
    tockenCheck: false,
    events: [],
    locations: [],
    numberOfEvents: 32 
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
      }
      this.setState({
       events: locationEvents,
       numberOfEvents: eventCount
      });
    });
  }

  async componentDidMount() {
    const accessToken =
      localStorage.getItem("access_token");
    const validToken = accessToken !== null ? await
      checkToken(accessToken) : false;
      this.setState({ tokenCheck: validToken });
    if(validToken === true) this.updateEvents()
    const searchParams = new
    URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.mounted = true;
    if (code && this.mounted === true && validToken === false){
      this.setState({tokenCheck:true });
      this.updateEvents()
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }


  render() {
    return tokenCheck === false ? (
      <div className='App'>
        <Login />
      </div> 
    ) : (
      <div className='App'> 
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        
      </div>
    );
  }
}

export default App;

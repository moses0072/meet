import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import Login from './login';
import { getEvents, checkToken } from './api';
import "./nprogress.css";
import { OfflineAlert } from './Alert';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    tokenCheck: false,
    currentLocation: 'all'
    
  }

  updateEvents = (location, eventCount) => {
    console.log('update events token valid: ', this.state.tokenCheck)
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((response) => {
        const locationEvents =
          location === "all"
            ? response.events
            : response.events.filter((event) => event.location === location);
        const events = locationEvents.slice(0, numberOfEvents);
        return this.setState({
          events: events,
          currentLocation: location,
          locations: response.locations,
        });
      });
    } else {
      getEvents().then((response) => {
        const locationEvents =
          currentLocation === "all"
            ? response.events
            : response.events.filter(
                (event) => event.location === currentLocation
              );
        const events = locationEvents.slice(0, eventCount);
        return this.setState({
          events: events,
          numberOfEvents: eventCount,
          locations: response.locations,
        });
      });
    }
  };
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
      this.updateEvents()
    }
    if (!navigator.onLine) {
      this.setState({
        offlineAlert: 'Cached data is being displayed.'
      })
    }
    else {
      this.setState({
        offlineAlert: ''
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { tokenCheck } = this.state;
      return tokenCheck === false ? (
        <div className="App"> 
          <Login  />
        </div>
        ):(  
          <div className="App">
            <h1>Meet App</h1>
            <h4>Choose your nearest city</h4>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
              numberOfEvents={this.state.numberOfEvents}
          />
             <NumberOfEvents
             numberOfEvents={this.state.numberOfEvents}
             updateEvents={this.updateEvents}
             />
             <OfflineAlert text={this.state.offlinealert} />
             <EventList
             events={this.state.events}
          />
        
          </div>
    );
  }
}

export default App;
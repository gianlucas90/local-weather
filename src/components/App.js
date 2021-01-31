import './App.css';
import axios from 'axios';
import React from 'react';
import Widget from './Widget';
import Spinner from './Spinner';

class App extends React.Component {
  state = {
    lat: null,
    lon: null,
    location: null,
    temp: null,
    tempUnit: 'celsius',
    weather: null,
    errorMessage: '',
  };

  onUnitTempClick = (unit) => {
    this.setState({ tempUnit: unit });
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      async (pos) => {
        this.setState({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });

        const response = await axios.get(
          'https://weather-proxy.freecodecamp.rocks/api/current',
          {
            params: {
              lon: this.state.lon,
              lat: this.state.lat,
            },
          }
        );
        this.setState({
          temp: response.data.main.temp,
          weather: response.data.weather[0].main,
          location: response.data.name,
        });
      },
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.weather) {
      return (
        <div className="ui segment">
          <h3> Error: {this.state.errorMessage}</h3>
        </div>
      );
    }
    if (!this.state.errorMessage && this.state.weather) {
      return (
        <Widget
          temp={this.state.temp}
          tempUnit={this.state.tempUnit}
          weather={this.state.weather}
          location={this.state.location}
          onUnitTempClick={this.onUnitTempClick}
        />
      );
    }
    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="app">{this.renderContent()}</div>;
  }
}

export default App;

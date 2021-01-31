import './Widget.css';
import React from 'react';

const weatherConfig = {
  clear: { icon: 'wi-day-sunny' },
  rain: { icon: 'wi-rain' },
  clouds: { icon: 'wi-cloud' },
  snow: { icon: 'wi-snow' },
};

const renderTemp = (temp, tempUnit) => {
  let symbolTemp = '°C';
  if (tempUnit === 'fahrenheit') {
    symbolTemp = '°F';
    temp = temp * (9 / 5) + 32;
  }
  if (temp) temp = temp.toFixed(2);
  return `${temp} ${symbolTemp}`;
};

const Widget = ({ temp, tempUnit, weather, location, onUnitTempClick }) => {
  let weatherIcon = '';
  if (weather) weatherIcon = weatherConfig[weather.toLowerCase()].icon;

  return (
    <div className="ui widget segment center aligned">
      <h1>Weather app</h1>
      <p className="location">{location}</p>
      <div className="weather">
        <i className={`wi ${weatherIcon}`}></i>
        <h2 className="temperature">{renderTemp(temp, tempUnit)}</h2>
      </div>
      <div className="unitTemp">
        <input
          onClick={(e) => onUnitTempClick(e.target.value)}
          type="radio"
          name="unitTemp"
          value="celsius"
        />
        <label htmlFor="celsius">°C</label>
        <input
          onClick={(e) => onUnitTempClick(e.target.value)}
          type="radio"
          name="unitTemp"
          value="fahrenheit"
        />
        <label htmlFor="fahrenheit">°F</label>
      </div>
      <h3>by Gianluca Zin</h3>
    </div>
  );
};

export default Widget;

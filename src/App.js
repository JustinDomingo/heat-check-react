import React, { useState, useEffect } from 'react';

const api = {
  key: 'lawl',
  base: 'api.openweathermap.org/data/2.5/'
}

function Icon(props) {
  return <img className="icon-img" src={`http://openweathermap.org/img/wn/${props.source}@2x.png`}/>
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  function getData(e) {
    e.preventDefault()
    fetch(`https://${api.base}weather?q=${query}&appid=${api.key}&units=imperial`)
        .then(res => res.json())
        .then(data => {
          setWeather(data)
        })
  }

  return (
  <body>
    <center>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 80) ? 'container cold' : 'container hot') : 'container default' }>
          <form onSubmit={getData}>
            <input type="text" placeholder="Search for a city..." className="input" onChange={e => setQuery(e.target.value)}></input>
          </form>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="state-date-container">
            <div className="city">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleString()}</div>
          </div>
          <div className="weather-container">
            <div className="weather">{weather.weather[0].main}</div>
            <div className="temperature">{Math.round(weather.main.temp)}°</div>  
            <Icon source={weather.weather[0].icon}/>        
          </div>
            </div>
          ) : ('')}
      </div>
    </center>
  </body>
  );
}

export default App;

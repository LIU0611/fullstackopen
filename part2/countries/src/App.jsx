// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(filteredCountries);
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
            fetchWeather(filteredCountries[0].capital[0]);
          } else {
            setSelectedCountry(null);
            setWeather(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching countries:', error);
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
      setWeather(null);
    }
  }, [query]);

  const fetchWeather = (capital) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather:', error);
      });
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
  };

  return (
    <div>
      <h1>Find Countries</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a country name"
      />
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

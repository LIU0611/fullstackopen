import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const capital = country.capital[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;

    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filtered);
    setSelectedCountry(null); // Reset selected country when filtering
  };

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  const renderCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowClick(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      return <CountryDetail country={filteredCountries[0]} />;
    } else {
      return <p>No countries match the search query</p>;
    }
  };

  return (
    <div>
      <h1>Find countries</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country"
      />
      {renderCountries()}
      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
};

export default App;

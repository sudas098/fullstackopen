import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;

const App = () => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/countries")
      .then((response) => setCountryData(response.data))
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const filteredCountryData = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(searchedTerm.toLowerCase())
  );

  useEffect(() => {
    const countryToFetch = selectedCountry || (filteredCountryData.length === 1 ? filteredCountryData[0] : null);

    if (countryToFetch) {
      const city = countryToFetch.capital[0];
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
        .then((response) => setWeather(response.data))
        .catch((error) => console.error("Weather fetch failed:", error));
    } else {
      setWeather(null);
    }
  }, [filteredCountryData, selectedCountry]);

  const onSearchInput = (e) => {
    setSearchedTerm(e.target.value);
    setSelectedCountry(null);
  };

  const activeCountry = selectedCountry || (filteredCountryData.length === 1 ? filteredCountryData[0] : null);

  return (
    <div>
      <div>
        find countries <input value={searchedTerm} onChange={onSearchInput} />
      </div>

      {filteredCountryData.length > 10 && searchedTerm !== "" && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountryData.length <= 10 && filteredCountryData.length > 1 && !selectedCountry && (
        <div style={{ marginTop: "10px" }}>
          {filteredCountryData.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </div>
          ))}
        </div>
      )}

      {activeCountry && (
        <div style={{ marginTop: "20px" }}>
          <h1>{activeCountry.name.common}</h1>
          <div>capital {activeCountry.capital[0]}</div>
          <div>area {activeCountry.area}</div>

          <h3>languages:</h3>
          <ul>
            {Object.values(activeCountry.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={`https://flagcdn.com/w320/${activeCountry.cca2.toLowerCase()}.png`}
            alt="flag"
            width="150"
            style={{ border: "1px solid #eee" }}
          />

          {weather && (
            <div>
              <h2>Weather in {weather.name}</h2>
              <p>temperature {weather.main.temp} Celsius</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
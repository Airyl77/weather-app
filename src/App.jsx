import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Weather />
    </>
  );
}

export default App;

function ProfileCard({ name, bio, hobby }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{name}</h2>
      <p>{bio}</p>
      <p>My hobby is {hobby}</p>
      <p>❤️ Likes: {count}</p>
      <button onClick={() => setCount(count + 1)}>Like</button>
    </div>
  );
}

function Weather() {
  function handleSearch() {
    setCity(searchCity);
    setForecast(null); // clear old forecast
    setError(null); // clear old error
    setLoading(true); // start loading
  }

  //const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return; // If no city is set, do not fetch weather data
    fetchWeather({ city })
      .then((data) => setForecast(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]); // This effect runs every time the 'city' state changes

  return (
    <>
      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <p>City: {city}</p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && forecast && (
        <>
          <div>7-day Forecast:</div>
          {forecast.time.map((date, i) => (
            <div key={date} className="forecast-card">
              <p>Date: {date}</p>
              <p>↑ {forecast.temperature_2m_max[i]}°C</p>
              <p>↓ {forecast.temperature_2m_min[i]}°C</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}

async function fetchWeather({ city }) {
  // Step 1: city name → coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
  );
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${city}" not found`);
  }
  const { latitude, longitude } = geoData.results[0];

  // Step 2: coordinates → 7-day forecast
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
  );
  const weatherData = await weatherRes.json();

  // console.log(weatherData.daily); // 👈 check this first
  // console.log(name);

  return weatherData.daily;
}

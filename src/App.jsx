import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ProfileCard
        name="Eugeniu"
        bio="I build cool stuff"
        hobby="programming"
      />
      <ProfileCard name="Alice" bio="Designer & coder" hobby="painting" />
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
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    if (!city) return; // If no city is set, do not fetch weather data
    fetch(`https://wttr.in/${city}?format=j1`)
      .then((res) => res.json())
      .then((data) => {
        setTemp(data.current_condition[0].temp_C);
        setWeather(data.current_condition[0].weatherDesc[0].value);
      });
  }, [city]); // This effect runs every time the 'city' state changes

  return (
    <>
      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button onClick={() => setCity(searchCity)}>Search</button>
      <p>City: {city}</p>
      <p>Temperature: {temp}°C</p>
      <p>Weather description: {weather}</p>
    </>
  );
}

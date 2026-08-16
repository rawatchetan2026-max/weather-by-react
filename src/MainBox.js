import React, { useState } from "react";

export default function MainBox() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handle = (e) => {
    setCity(e.target.value);
  };

  // 1. Pass the search value directly into the function to prevent the race condition
  const getWeatherData = async (searchCity) => {
    // Added '&units=metric' so temperature returns in Celsius instead of Kelvin
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=35d580dfbbda72d7797d7f0a23da58e4&units=metric`;

    let res = await fetch(url);
    let jsonRes = await res.json();

    if (res.ok) {
      setWeatherData(jsonRes); // FIX: Changed from 'json' to 'jsonRes'
    } else {
      alert("City not found. Please try again.");
    }
  };

  const sbt = () => {
    if (!city.trim()) return;
    getWeatherData(city);
    setCity(""); // Now it's perfectly safe to clear the text box
  };

  const press = (e) => {
    if (e.key === "Enter") {
      sbt();
    }
  };

  return (
    <>
      <div className="box">
        <input
          type="text"
          placeholder="Search a Place"
          value={city}
          onChange={handle}
          onKeyDown={press}
        />

        <button
          className="btn btn-primary"
          type="button" // Changed to button since we manage submission manually
          onClick={sbt}
        >
          Search
        </button>
      </div>

      {/* FIX: Use an explicit short-circuit wrapper so the UI won't render unless data exists */}
      <div className="container text-center mt-4">
        {weatherData ? (
          <>
            <h1>{weatherData.name}</h1>

            <div class="container overflow-hidden text-center">
              <div class="row gy-5">
                <div class="col-6">
                  <div class="p-3">
                    <strong>
                      Wind <i class="fa-solid fa-wind"></i> :
                    </strong>{" "}
                    {weatherData.wind?.speed} m/s
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3">
                    <strong>
                      Humidity <i class="fa-solid fa-droplet"></i> :
                    </strong>{" "}
                    {weatherData.main?.humidity}%
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3">
                    <strong>
                      Weather <i class="fa-regular fa-cloud"></i> :
                    </strong>{" "}
                    {weatherData.weather?.[0]?.main}
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3">
                    <strong>
                      Temp <i class="fa-solid fa-temperature-high"></i> :
                    </strong>{" "}
                    {weatherData.main?.temp}°C
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted">
            <h1>Check Weather</h1>
            Enter a city name above to view current weather data.
          </p>
        )}
      </div>
    </>
  );
}

import "./main.css";
import { BrowserRouter } from "react-router-dom";

import React, { useEffect, useState } from "react";
const api = {
  key:"9f650d15b712241a3b9abbc4b053bda3",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [query, setQuery] = useState("");
  const [Weather, setWeather] = useState({});

  const search = (evt) => {
    evt.preventDefault();
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };
  // for default weather where city = Mumbai
  useEffect(() => {
    fetch(`${api.base}weather?q=mumbai&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  }, []);

  return (
    <BrowserRouter>
    <div
      style={{
        backgroundImage: `url("https://source.unsplash.com/1600x900/?${Weather.name}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" flex justify-center items-center h-screen"
    >
      <div className=" card m-2 p-4 sm:p-6 bg-[#000000d0] text-white rounded-2xl flex flex-col w-[370px]">
        <form className="search w-full flex" onSubmit={search}>
          <input
            type="text"
            className="search-bar flex-grow w-full rounded-md mr-2 text-black font-medium "
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className="bg-white text-black rounded-full px-2 hover:bg-slate-300">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </form>
        {typeof Weather.main != "undefined" ? (
          <div className="weather loading flex flex-col gap-1 justify-around mt-2">
            <h2 className="city text-2xl sm:text-3xl">
              Weather in {Weather.name}
            </h2>
            <h1 className="temp text-3xl mb-4 font-bold">
              {Weather.main.temp}°C
            </h1>
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${Weather.weather[0].icon}.png`}
                alt=""
                className="icon"
              />
              <div className="description">{Weather.weather[0].main}</div>
            </div>
            <div className="humidity">Humidity: {Weather.main.humidity}</div>
            <div className="wind">Wind speed: {Weather.wind.speed} km/h</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  </BrowserRouter>
  );

}

export default App;

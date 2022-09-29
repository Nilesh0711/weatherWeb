import { useState, useEffect } from "react";
import "./App.css";
import LoginModal from "./pages/loginModal";
import SignupModal from "./pages/signupModal";

function App() {
  const [user, setUser] = useState(false);
  const [city, setcity] = useState("");
  const [list, setList] = useState([]);
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: "",
    hum: "",
    speed: "",
    text: "",
    icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
  });

  const apiKey = "816cc694237944c296f84250222909";

  const handleChange = (e) => {
    e.preventDefault();
    setcity(e.target.value);
  };

  const fetchWeather = (e, city) => {
    e.preventDefault();
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=" +
        apiKey +
        "&q=" +
        city +
        "&aqi=no"
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => setFromData(data));
    fetchForecast(city);
  };

  const setFromData = (data1) => {
    const text = data1["current"]["condition"]["text"];
    const icon = data1["current"]["condition"]["icon"];
    const city = data1["location"]["name"];
    const temp = data1["current"]["temp_c"];
    const hum = data1["current"]["humidity"];
    const speed = data1["current"]["wind_kph"];
    setWeatherData({
      city,
      temp,
      hum,
      speed,
      text,
      icon,
    });
    let image = document.getElementById("pic");
    let str = "https://source.unsplash.com/1600x900/?" + city;
    image.style.backgroundImage = "url(" + str + ")";
  };

  const fetchForecast = (city) => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No forecast found");
          throw new Error("no forecast found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setList(data["forecast"]["forecastday"]);
      });
  };

  const ForecastCard = ({ date, day }) => {
    let date1 = date.substring(5, 10);
    let max = day["maxtemp_c"];
    let min = day["mintemp_c"];
    let icon = day["condition"]["icon"];
    return (
      <div className="flex flex-col rounded-md bg-zinc-900 items-center mx-3 py-1 px-3">
        <div className="day mt-2 text-xl">{date1}</div>
        <img src={icon} className="w-12 h-12" />
        <div className="min mt-2 text-md">{max}°C</div>
        <div className="max my-2 text-md">{min}°C</div>
      </div>
    );
  };

  return (
    <div
      id="pic"
      className="flex pic-ture items-center justify-center bg-cover bg-no-repeat h-screen"
    >
      <div className="bg-black opacity-80 w-3/5 flex flex-col justify-center items-center fixed h-full">
        <div className="text-2xl text-white my-4 font-bold">KalTak</div>
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            className="px-5 py-2 rounded-3xl border-0 w-2/3 text-white text-xl bg-slate-900 opacity-80"
            placeholder="Search"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            onClick={(e) => fetchWeather(e, city)}
            className="rounded-full ml-5 p-2.5 text-white bg-slate-900 opacity-80"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-start w-2/3 mt-7">
          <div className="flex flex-col justify-start w-2/3">
            <div className="text-white font-bold">
              <div className="city text-2xl">Weather in {weatherData.city}</div>
              <div className="temp mt-6 text-4xl">{weatherData.temp}°C</div>
            </div>
            <div className="text-white text-xl mt-2">
              <div className="city">Humidity: {weatherData.hum}%</div>
              <div className="temp">Wind speed: {weatherData.speed}km/h</div>
            </div>
          </div>
          <div className="flex-col text-white flex items-center">
            <img src={weatherData.icon} className="w-32 h-32" />
            <div className="text-xl">{weatherData.text}</div>
          </div>
        </div>
        (
        {!user ? (
          <div className="notlogged mt-3 flex flex-col w-2/3 mr-20">
            <div className="login font-bold text-white text-xl">
              Oops! Your are not logged in to see forecast
            </div>
            <div className="flex text-white text-2xl mt-7">
              <div className="mx-2">
                <LoginModal user={setUser} />
              </div>
              <SignupModal user={setUser} />
            </div>
          </div>
        ) : (
          <div className="loggedIn mt-4 flex flex-col w-2/3">
            <div className="forecast text-white text-xl font-bold relative right-10">
              Forecast of next day
            </div>
            <div
              id="addMe"
              className="flex mt-4 text-white justify-center items-center"
            >
              {[...list].map((value, index) => (
                <ForecastCard key={index} {...value} />
              ))}
            </div>
          </div>
        )}
        )<div className="my-2"></div>
      </div>
    </div>
  );
}

export default App;

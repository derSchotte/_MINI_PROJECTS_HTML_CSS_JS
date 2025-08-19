import './style.css'
import magnifying_glass from '/assets/magnifying-glass-solid-full.svg';
import sun_01 from '/assets/sun-solid-full.svg';
import moon_01 from '/assets/moon-solid-full.svg';
import sun_cloud_02 from '/assets/cloud-sun-solid-full.svg';
import moon_cloud_02 from '/assets/cloud-moon-solid-full.svg';
import cloud_03 from '/assets/cloud-solid-full.svg';
import broken_cloud_04 from '/assets/broken-cloud-solid-full.svg';
import broken_cloud_rain_09 from '/assets/broken-cloud-rain-solid-full.svg';
import cloud_sun_rain_10 from '/assets/cloud-sun-rain-solid-full.svg';
import cloud_moon_rain_10 from '/assets/cloud-moon-rain-solid-full.svg';
import broken_cloud_thunder_11 from '/assets/broken-cloud-thunder-solid-full.svg';
import snowflake_13 from '/assets/snowflake-solid-full.svg';
import smog_14 from '/assets/smog-solid-full.svg';

import humidity from '/assets/water-solid-full.svg';
import wind_speed from '/assets/wind-solid-full.svg';

const info_columns = "col flex items-center text-left";
const flex_columns = "flex flex-col items-center justify-center";
const columns_icon_size = "w-12 h-12 mr-2.5";
const columns_text_size = "text-2xl mb-[-8px]";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY as string;
if(!API_KEY) throw new Error("API_KEY not found");
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="card w-[90%] max-w-[470px] bg-gradient-to-b from-teal-300 to-teal-600 text-white m-[100% auto 0] p-[40px 35px] rounded-2xl text-center pl-6 pr-6">
    <div class="search w-full flex justify-between items-center pt-6">
      <input id="city-input" class="border-0 outline-none bg-slate-100 text-slate-700 h-[40px] rounded-4xl flex-1 mr-4 text-xl pl-4" type="text" placeholder="Search for a city..."/>
      <button id="search-button" class="w-10 h-10 border-0 outline-none bg-slate-50 rounded-full cursor-pointer p-2"><img src="${magnifying_glass}" alt="search" /></button>
    </div>
    <div class="weather flex flex-col items-center">
      <img id="weather-icon" class="weather-icon invert w-48 h-48 mt-8" src="${sun_01}" alt="weather" />
      <h1 id="temp" class="temp text-[80px] font-medium">25 <sup>°</sup>C</h1>
      <h2 id="location" class="location text-[45px] font-normal mt-[-10px]">Vienna</h2>
      <div class="details w-full flex justify-between items-center mb-4 mt-12">
        <div class="${info_columns}">
          <img class="humidity-icon invert ${columns_icon_size}" src="${humidity}" alt="humidity" />
          <div class="${flex_columns}">
            <span id="humidity" class="${columns_text_size}">80%</span>
            <span>Humidity</span>
          </div>
        </div>
        <div class="${info_columns}">
          <img class="wind-speed-icon invert ${columns_icon_size}" src="${wind_speed}" alt="wind speed" />
          <div class="${flex_columns}">
            <span id="wind-speed" class="${columns_text_size}">8 km/h</span>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>  
  </div>
`
const cityInput = document.querySelector<HTMLInputElement>("#city-input")!;
const searchButton = document.querySelector<HTMLButtonElement>("#search-button")!;

searchButton.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if(!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if(!response.ok) {
      // OpenWeatherMap API returns 404 if city is not found
      const err = await response.json().catch(() => null);
      throw new Error(err?.message || "City not found.");
    }
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    alert((error as Error).message);
  }
});

cityInput.addEventListener("keydown", (event) => {
  if(event.key === "Enter") searchButton.click();
});

const updateWeather = (data: any) => {
  const { name, main, wind } = data;
  const { temp, humidity } = main;

  document.querySelector<HTMLImageElement>("#weather-icon")!.src = weatherIcon(data);
  document.querySelector<HTMLHeadingElement>("#location")!.textContent = name;
  document.querySelector<HTMLHeadingElement>("#temp")!.textContent = `${temp.toFixed(0)}°C`;
  document.querySelector<HTMLHeadingElement>("#humidity")!.textContent = `${humidity}%`;
  document.querySelector<HTMLHeadingElement>("#wind-speed")!.textContent = `${wind.speed} km/h`;
};

const weatherIcon = (data: any) => {
  const { weather } = data;
  const { icon } = weather[0];

  switch(icon) {
    case "01d":
      console.log(sun_01);
      return sun_01;
    case "01n":
      console.log(moon_01);
      return moon_01;
    case "02d":
      console.log(sun_cloud_02);
      return sun_cloud_02;
    case "02n":
      console.log(moon_cloud_02);
      return moon_cloud_02;
    case "03d":
      console.log(cloud_03);
      return cloud_03;
    case "03n":
      console.log(cloud_03);
      return cloud_03;
    case "04d":
      console.log(broken_cloud_04);
      return broken_cloud_04;
    case "04n":
      console.log(broken_cloud_04);
      console.log(broken_cloud_04);
      return broken_cloud_04;
    case "09d":
      console.log(broken_cloud_rain_09);
      return broken_cloud_rain_09;
    case "10d":
      console.log(cloud_sun_rain_10);
      return cloud_sun_rain_10;
    case "10n":
      console.log(cloud_moon_rain_10);
      return cloud_moon_rain_10;
    case "11d":
      console.log(broken_cloud_thunder_11);
      return broken_cloud_thunder_11;
    case "11n":
      console.log(broken_cloud_thunder_11);
      return broken_cloud_thunder_11;
    case "13d":
      console.log(snowflake_13);
      return snowflake_13;
    case "13n":
      console.log(snowflake_13);
      return snowflake_13;
    case "50d":
      console.log(smog_14);
      return smog_14;
    case "50n":
      console.log(smog_14);
      return smog_14;
    default:
      console.log(sun_01);
      return sun_01;
  }
}

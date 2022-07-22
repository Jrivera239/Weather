const app = {
  init: () => {
    document
      .getElementById('btnCurrent')
      .addEventListener('click', app.getLocation);
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetch);
  },
  
  fetch: (ev) => {

    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;
    const key = 'c3ed635e20e129bc3f138cc61aabb462'
    const lang = 'en';
    const units = 'metric';
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

    //fetch  weather//


    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.Weather(data);
      })
      .catch(console.err);
  },
  //hours/time//
  getLocation: (hr) => {
    let clock = {
      enableHighAccuracy: true,
      timeout: 1000 * 10, 
      maximumAge: 1000 * 60 * 5,
    };
    navigator.geolocation.getCurrentPosition(app.flet, app.wtf, clock);
  },
  flet: (position) => {
  //position cords//
    document.getElementById('latitude').value =
      position.coords.latitude.toFixed(2);
    document.getElementById('longitude').value =
    position.coords.longitude.toFixed(2);
  },
  Weather: (resp) => {
     let row = document.querySelector('.weather.row');

     // days displayed and text info within //
     row.innerHTML = resp.daily
       .map((day, Days) => {
         if (Days <= 4) {
           let dt = new Date(day.dt * 1000); 
 //main card display after response//
           return `<div class="col">
 <div class="card">
 <h5 class="card-title">${dt.toDateString()}</h5>
 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
 class="card-img-top" alt="${day.weather[0].description}"/>
   <div class="card-body">
     <h3 class="card-title">${day.weather[0].main}</h3>
       <p class="weather-text">High ${day.temp.max}&deg;C Low ${day.temp.min}&deg;C</p>
       <p class="weather-text">High Feels like ${day.feels_like.day}&deg;C</p>
       <p class="weather-text">Wind ${day.wind_speed}m/s, ${day.wind_deg}&deg;</p>
       <p class="weather-text">Humidity ${day.humidity}%</p>
       <p class="weather-text">UV Index ${day.uvi}</p>
      </div>
      </div>
     </div>
     </div>`;
         }
       })
       .join(' ');
   },
 };
 
 app.init();
 
 
 
 async function getCityCoords(city) {
   const response = await axios.get(`${config.WEATHER_API_ENDPOINT}q=${city}`);
   const {
     coord,
     sys: { country },
   } = response.data;
   return { ...coord, country };
 }
 
 async function getCityName(lon, lat) {
   const response = await axios.get(
     `${config.WEATHER_API_ENDPOINT}lon=${lon}&lat=${lat}`
   );
   const {
     name,
     sys: { country },
   } = response.data;
   return { name, country };
 }

 async function getWeather(lon, lat) {
   const response = await axios.get(
     `${config.WEATHER_DATA_ENDPOINT}lon=${lon}&lat=${lat}`
   );
   return response.data;
 }
 

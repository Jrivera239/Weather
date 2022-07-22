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
  getLocation: (hr) => {
    let clock = {
      enableHighAccuracy: true,
      timeout: 1000 * 10, 
      maximumAge: 1000 * 60 * 5,
    };
    navigator.geolocation.getCurrentPosition(app.flet, app.wtf, clock);
  },
  flet: (position) => {
  //poston cords//
    document.getElementById('latitude').value =
      position.coords.latitude.toFixed(2);
    document.getElementById('longitude').value =
      position.coords.longitude.toFixed(2);

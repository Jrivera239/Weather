const app = {
  init: () => {
    document
      .getElementById('btnCurrent')
      .addEventListener('click', app.getLocation);
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetch);
  },
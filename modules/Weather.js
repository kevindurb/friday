const fetch = require('node-fetch');
const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY;

class Weather {
  constructor(friday) {
    this.friday = friday;
  }

  fetchWeather(location) {
    return fetch(
      `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${location.latitude},${location.longitude}`,
    ).then(response => response.json());
  }

  async shouldRespond(message) {
    return message.text.includes('weather');
  }

  async respond(message) {
    const weather = await this.fetchWeather(message.location)
    const temp = parseInt(weather.currently.temperature, 10);
    const summary = weather.currently.summary;

    return `It is currently ${temp} and ${summary}`;
  }
}

module.exports = Weather;

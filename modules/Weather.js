const fetch = require('node-fetch');
const entityUtilities = require('../utils/entities');
const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY;

class Weather {
  getClassifiers() {
    return [
      ['whats the weather like', 'current']
    ]
  }

  fetchWeather(location) {
    return fetch(
      `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${location.latitude},${location.longitude}`,
    ).then(response => response.json());
  }

  async current(message, entities) {
    const weather = await this.fetchWeather(message.location)
    const temp = parseInt(weather.currently.temperature, 10);
    const summary = weather.currently.summary;

    return `It is currently ${temp} and ${summary}`;
  }
}

module.exports = Weather;

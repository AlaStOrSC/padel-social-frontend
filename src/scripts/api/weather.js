export async function getWeather(city, date, time) {
  const apiKey = '1b7d1bdc3706f255a1b2d668ba6c27b9';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('Respuesta de la API del tiempo:', data);

    if (!data.list) {
      console.error('No se encontró información del clima.');
      return { weather: 'No disponible', rainWarning: false };
    }

    const targetDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').unix();
    const forecast = data.list.find((item) => {
      const forecastTime = moment(item.dt_txt).unix();
      return Math.abs(forecastTime - targetDateTime) < 10800;
    });

    if (!forecast) {
      console.error('No se encontró pronóstico para la fecha y hora especificadas.');
      return { weather: 'No disponible aún', rainWarning: false };
    }

    const temp = forecast.main.temp;
    const weatherDesc = forecast.weather[0].description;
    const rainProbability = forecast.pop || 0;

    return {
      weather: `${weatherDesc}, ${temp}°C`,
      rainWarning: rainProbability > 0.2,
    };
  } catch (error) {
    console.error('Error obteniendo el clima:', error);
    return { weather: 'Error al obtener', rainWarning: false };
  }
}
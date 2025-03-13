document.addEventListener("DOMContentLoaded", function(){
    const axios = require('axios');

    async function fetchWeatherData(latitude, longitude, temperatureUnit= 'Farenheit') {
        try {
            const params ={
                latitude: latitude,
                longitude: longitude,
                current_weather: true,
                temperatureUnit:temperatureUnit,
            }
            const url ='https://api.open-meteo.com/v1/forecast';
            
            const response = await axios.get(url, { params });

            console.log('API Response',response.data);

            const weather = response.data.current_weather;
            if (!weather){
                console.log('Nenhum dado de clima retornado.');
                alert('Falha ao buscar dados do clima');
                return;
            }
            const currentTime = new Date(weather.time);

            const weatherCondition = getWeatherCondition(weather.weathercod);

            const weatherData = {
                current:{
                    time: currentTime,
                    temperature2m: weather.temperature,
                    isDay: isDay,
                    weatherCondition: weatherCondition,
                },
            };

            const conditionElement= document.getElementById('condition');
            if (conditionElement){
                conditionElement.innerText = `It's ${weatherData.current.weatherCondition} today`; 
            }
        } catch (error) {
            
        }
        
    }
})
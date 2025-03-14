document.addEventListener("DOMContentLoaded", function() {
    const axios = require('axios');  
    require('dotenv').config(); 

    const API_KEY = process.env.API_KEY;
    const LATITUDE = -15.7797;  
    const LONGITUDE = -47.9297; 

    let temperatureUnit = 'metric';  

    async function fetchWeatherData(latitude, longitude, temperatureUnit) {
        try {
            const params = {
                lat: latitude,
                lon: longitude,
                units: temperatureUnit,  
                appid: API_KEY,  
            };

            const url = 'https://api.openweathermap.org/data/2.5/weather';

            console.log('Fazendo requisição para a URL:', url); 

            const response = await axios.get(url, { params });

            console.log('API Response:', response.data); 

            if (response.data && response.data.weather && response.data.weather[0]) {
                const weather = response.data.weather[0];
                const temperature = response.data.main.temp;

                const conditionElement = document.getElementById('condition');
                const temperatureElement = document.getElementById('temperature');

                if (conditionElement) {
                    conditionElement.innerText = `Condição: ${weather.description}`;
                }

                if (temperatureElement) {
                    temperatureElement.innerText = `Temperatura: ${temperature}°${temperatureUnit === 'imperial' ? 'F' : 'C'}`;
                }
            } else {
                console.error('Dados de clima não encontrados na resposta da API.');
            }

        } catch (error) {
            console.error('Erro ao buscar dados do clima:', error);

            const conditionElement = document.getElementById('condition');
            const temperatureElement = document.getElementById('temperature');

            if (conditionElement) {
                conditionElement.innerText = 'Erro ao carregar a condição do tempo.';
            }

            if (temperatureElement) {
                temperatureElement.innerText = 'Erro ao carregar a temperatura.';
            }
        }
    }

    fetchWeatherData(LATITUDE, LONGITUDE, temperatureUnit);

    const celsiusButton = document.querySelector('.temp-celsius');
    const fahrenheitButton = document.querySelector('.temp-fahrenheit');

    if (celsiusButton && fahrenheitButton) {
        celsiusButton.addEventListener('click', function() {
            temperatureUnit = 'metric';  
            fetchWeatherData(LATITUDE, LONGITUDE, temperatureUnit);  
        });

        fahrenheitButton.addEventListener('click', function() {
            temperatureUnit = 'imperial';  
            fetchWeatherData(LATITUDE, LONGITUDE, temperatureUnit);  
        });
    } else {
        console.error("Botões não encontrados no DOM.");
    }
});

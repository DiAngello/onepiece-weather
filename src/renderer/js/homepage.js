document.addEventListener("DOMContentLoaded", function() {
    const axios = require('axios');  
    require('dotenv').config(); 

    const API_KEY = process.env.API_KEY;
    const LATITUDE = -15.7797;  
    const LONGITUDE = -47.9297; 

    let temperatureUnit = 'metric';  

    
    const weatherTranslations = {
        "thunderstorm with light rain": "Tempestade com chuva leve",
        "thunderstorm with rain": "Tempestade com chuva",
        "thunderstorm with heavy rain": "Tempestade com chuva forte",
        "light thunderstorm": "Tempestade leve",
        "thunderstorm": "Tempestade",
        "heavy thunderstorm": "Tempestade forte",
        "ragged thunderstorm": "Tempestade irregular",
        "thunderstorm with light drizzle": "Tempestade com garoa leve",
        "thunderstorm with drizzle": "Tempestade com garoa",
        "thunderstorm with heavy drizzle": "Tempestade com garoa forte",
        "light intensity drizzle": "Garoa leve",
        "drizzle": "Garoa",
        "heavy intensity drizzle": "Garoa forte",
        "light intensity drizzle rain": "Garoa leve com chuva",
        "drizzle rain": "Garoa com chuva",
        "heavy intensity drizzle rain": "Garoa forte com chuva",
        "shower rain and drizzle": "Chuva e garoa",
        "heavy shower rain and drizzle": "Chuva forte e garoa",
        "shower drizzle": "Garoa com chuva",
        "light rain": "Chuva leve",
        "moderate rain": "Chuva moderada",
        "heavy intensity rain": "Chuva forte",
        "very heavy rain": "Chuva muito forte",
        "extreme rain": "Chuva extrema",
        "freezing rain": "Chuva congelante",
        "light intensity shower rain": "Chuva leve",
        "shower rain": "Chuva",
        "heavy intensity shower rain": "Chuva forte",
        "ragged shower rain": "Chuva irregular",
        "light snow": "Neve leve",
        "snow": "Neve",
        "heavy snow": "Neve forte",
        "sleet": "Chuva congelada",
        "light shower sleet": "Garoa congelada leve",
        "shower sleet": "Garoa congelada",
        "light rain and snow": "Chuva e neve leves",
        "rain and snow": "Chuva e neve",
        "light shower snow": "Neve leve com garoa",
        "shower snow": "Neve com garoa",
        "heavy shower snow": "Neve forte com garoa",
        "mist": "Névoa",
        "smoke": "Fumaça",
        "haze": "Névoa seca",
        "dust": "Poeira",
        "fog": "Névoa",
        "sand": "Areia",
        "dust": "Poeira",
        "ash": "Cinzas vulcânicas",
        "squall": "Rajadas",
        "tornado": "Tornado",
        "clear sky": "Céu limpo",
        "few clouds": "Poucas nuvens",
        "scattered clouds": "Nuvens dispersas",
        "broken clouds": "Nuvens fragmentadas",
        "overcast clouds": "Nuvens densas"
    };

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

                const translatedCondition = weatherTranslations[weather.description.toLowerCase()] || weather.description;

                if (conditionElement) {
                    conditionElement.innerText = `Condição: ${translatedCondition}`;
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

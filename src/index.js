const { app, BrowserWindow } = require('electron');
const axios = require('axios');
const path = require('node:path');
require('dotenv').config(); 

const apiKey = process.env.API_KEY; 

let mainWindow;

const LATITUDE = -15.7797; 
const LONGITUDE = -47.9297; 

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 460,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, './renderer/homepage.html'));
};

async function fetchWeatherData() {
  try {
    const params = {
      lat: LATITUDE,
      lon: LONGITUDE,
      units: 'metric', 
      appid: apiKey, 
    };

    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const response = await axios.get(url, { params });

    const weather = response.data.weather[0];
    const temperature = response.data.main.temp;

    mainWindow.webContents.send('weather-data', {
      condition: weather.description,
      temperature: temperature,
    });
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
  }
}

app.whenReady().then(() => {
  createWindow();
  fetchWeatherData(); 
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

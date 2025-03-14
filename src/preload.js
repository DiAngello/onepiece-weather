const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    send: (channel, data) => ipcRenderer.send(channel, data),
});

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('weather-data', (event, data) => {
    const conditionElement = document.getElementById('condition');
    const temperatureElement = document.getElementById('temperature');

    if (conditionElement) {
      conditionElement.innerText = `Condição: ${data.condition}`;
    }

    if (temperatureElement) {
      temperatureElement.innerText = `Temperatura: ${data.temperature}°C`; 
    }
  });
});

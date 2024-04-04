// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const markerPosition = [7.610684601768583, 80.82637551408995]; // Coordinates for the marker
  const markerDetails = {
    city: 'Sample City',
    temperature: 25,
    humidity: 70,
    weatherDescriptions: 'Cloudy',
    observationTime: '2024-04-05 12:00:00',
    // Add more details as needed
  };

  return (
    <MapContainer
      center={markerPosition}
      zoom={13}
      style={{ height: '50vw', width: '90vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition}>
        <Popup>
          <div>
            <h2>{markerDetails.city}</h2>
            <p>Temperature: {markerDetails.temperature}°C</p>
            <p>Humidity: {markerDetails.humidity}%</p>
            <p>Weather: {markerDetails.weatherDescriptions}</p>
            <p>Observation Time: {markerDetails.observationTime}</p>
            {/* Add more details as needed */}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

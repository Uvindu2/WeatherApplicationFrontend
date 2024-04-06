import React, { useState, useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const center = [7.926252474659472, 80.62546784024994];

const districtPositions = [
    { name: 'Kandy', position: [7.344505821309715, 80.62933056448098] },
    { name: 'Colombo', position: [6.924722191330576, 79.8600721708302] },
    { name: 'Batticaloa', position: [7.725428838692528, 81.69771966377748] },
    { name: 'Anuradhapura', position: [8.312103325422829, 80.4016659067846] },
    { name: 'Trincomalee', position: [8.587329701114093, 81.21488350955728] },
    { name: 'Galle', position: [6.0331443376714455, 80.21631494506686] },
    { name: 'Mullaitivu', position: [9.266898187430082, 80.81458651996] },
    { name: 'Kegalle', position: [7.251859304308899, 80.34605940053824] },
    { name: 'Matara', position: [5.951576934505497, 80.54600011635733] },
    { name: 'Vavuniya', position: [8.753873661987114, 80.49835718035175] },
    { name: 'Ratnapura', position: [6.705250147808733, 80.38443538225935] },
    { name: 'Monaragala', position: [6.890431644940554, 81.34514630709467] },
    { name: 'Badulla', position: [6.99326727102719, 81.05483759065311] },
    { name: 'Matale', position: [7.466990554907673, 80.62287418406251] },
    { name: 'Nuwara Eliya', position: [6.949333926498285, 80.78852105686494] },
    { name: 'Gampaha', position: [7.0831257117879804, 80.00887966991594] },
    { name: 'Kilinochchi', position: [9.379622441927102, 80.37675348691602] },
    { name: 'Ampara', position: [7.3005718816507725, 81.67394019270391] },
    { name: 'Polonnaruwa', position: [7.941249963671026, 81.01892307211213] },
    { name: 'Hambantota', position: [6.160651731755219, 81.10703702311253] },
    { name: 'Kurunegala', position: [7.482779832378108, 80.36080853441112] },
    { name: 'Puttalam', position: [8.039227604303017, 79.842002308453] },
    { name: 'Kalutara', position: [6.5842935417522765, 79.96249686981056] },
    { name: 'Mannar', position: [8.995349585431844, 79.88581031754181] },
    { name: 'Jaffna', position: [9.675689491608374, 80.03613210882942] },
];

const WeatherMap = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [maxTemperature, setMaxTemperature] = useState(null);
    const [minTemperature, setMinTemperature] = useState(null);
    const [maxTempDistrict, setMaxTempDistrict] = useState(null);
    const [minTempDistrict, setMinTempDistrict] = useState(null);

    useEffect(() => {
        fetchWeatherData();
        const interval = setInterval(fetchWeatherData,1000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeatherData = () => {
        // axios.get('http://localhost:4000/api/weather/')
            axios.get('https://weathermapbe.onrender.com/api/weather/')
            .then(response => {
                setWeatherData(response.data);
                updateTemperatureData(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    };

    const updateTemperatureData = (data) => {
        if (data.length === 0) return;

        let maxTemp = data[0].temperature;
        let minTemp = data[0].temperature;
        let maxTempDist = data[0].district;
        let minTempDist = data[0].district;

        data.forEach(({ temperature, district }) => {
            if (temperature > maxTemp) {
                maxTemp = temperature;
                maxTempDist = district;
            }
            if (temperature < minTemp) {
                minTemp = temperature;
                minTempDist = district;
            }
        });

        setMaxTemperature(maxTemp);
        setMinTemperature(minTemp);
        setMaxTempDistrict(maxTempDist);
        setMinTempDistrict(minTempDist);
    };

    const customIcon = L.icon({
        iconUrl: '/marker.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    return (
        <section style={{ display: 'flex' }}>
            <MapContainer
                center={center}
                zoom={8}
                style={{ width: '75vw', height: '90vh' }}
                dragging={true}
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <TileLayer
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=vIkXdioF5LVFcmvw5yTi"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />

                {districtPositions.map(({ name, position }) => {
                    const weatherInfo = weatherData.find(item => item.district === name);
                    return (
                        <Marker key={name} position={position} icon={customIcon}>
                            <Popup>
                                <h3>{name}</h3>
                                {weatherInfo && (
                                    <div>
                                        <p>Temperature: {weatherInfo.temperature}°C</p>
                                        <p>Humidity: {weatherInfo.humidity}%</p>
                                        <p>Pressure: {weatherInfo.airPressure} hPa</p>
                                    </div>
                                )}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            <section style={{ flex: '1', padding: '20px', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'green', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', maxWidth: '300px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '20px', color: 'white' }}>Temperature Summary</h2>
                    <table style={{ width: '100%', color: 'white' }}>
                        <tbody>
                            <tr>
                                <td>{maxTempDistrict}</td>
                                <td>{maxTemperature}°C (Max)</td>
                            </tr>
                            <tr>
                                <td>{minTempDistrict}</td>
                                <td>{minTemperature}°C (Min)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    );
};

export default WeatherMap;

import { useState } from 'react'
import React  from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'
import setBackground from '../background'

const API_KEY = import.meta.env.VITE_WEATHER_API;

const Weather = () => {

    const [location,setLocation] = useState('');
    const [currentData,setCurrentData] = useState({});
    const [city,setCity] = useState({});
    const [forecast,setForecast] = useState({});
    const [autoComplete,setAutoComplete] = useState([]);

    // autocomplete search
    const searchResult = (value) => {
        axios.get(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`).then(response => setAutoComplete(response.data));
    }

    // get weather info of the location
    const searchLocation = (event,value) => {
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=3&aqi=no&alerts=no`)
        .then(response => response.data).then(data => {
            setCity(data.location);
            setCurrentData(data.current);
            setForecast(data.forecast); 
            document.querySelector(".right").style.display = "block";
        })
        setLocation('');
        setAutoComplete([]);  
    }


  return (
    <div className="weatherData" style={{backgroundImage:`url(${setBackground(currentData.condition?.text)})`}}>
        <div className="search-box">
            <i class="fa-solid fa-location-dot"></i>
            <input value = {location} placeholder='Search by City name'
                onChange = {event => {setLocation(event.target.value); searchResult(event.target.value)}}/>
            <button onClick={event => {searchLocation(event,location)}}>
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <div className='suggestions'>
            {autoComplete.map((data) => {
            return <li onClick={event => {searchLocation(event,data.name)}}>{data.name}, {data.region}</li>  
            })}
            </div>
        </div>
        
        <div className="wrapper">
            <div className="left">              
                <div className='description'><h1>{currentData.condition?.text}</h1></div>
                <div className="hourlydata">
                {forecast.forecastday?.[0]?.hour?.map((hourdata) => {
                return <div className="hourly">
                    <li>{hourdata.time.slice(11)}</li>
                    <img src={hourdata.condition?.icon} alt="weather-icon" />
                    <li>{parseInt(hourdata.temp_c)}°C</li>
                    </div> })}
                </div> 
            </div>

            <div className="right">
                <div className="current">
                    <p>{city.name}</p>
                    <h1 className='temperature'>{currentData.temp_c ?(parseInt(currentData.temp_c)) : null}°C</h1>
                    <h1 className='description'>{currentData.condition?.text}</h1>
                    <div className="additional">
                        <p>Real Feel<br/>{currentData.feelslike_c}°C</p>
                        <p>Wind Speed<br/>{currentData.wind_kph} km/h</p>
                        <p>UV Index<br/>{currentData.uv}</p>
                    </div>
                </div> 
                <div className="dailydata">
                    <p>The Next Days Forecast</p>
                    {forecast.forecastday?.map((dailydata)=>{
                    return <div className='daily'>
                        <img src={dailydata.day?.condition?.icon} alt="daily weather icon"/>
                        <div className='day-description'>
                            <p>{dateFormat(dailydata.date,"dddd, mmmm dd")}</p>
                            <p>{dailydata.day?.condition?.text}</p>
                        </div>
                        <div className="min-max">
                            <li>{parseInt(dailydata.day?.mintemp_c)}°</li>
                            <li>{parseInt(dailydata.day?.maxtemp_c)}°</li>
                        </div>
                    </div>})}
                </div> 
            </div>
        </div>
    </div>
)
}

export default Weather;


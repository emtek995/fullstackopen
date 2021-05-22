import axios from 'axios';
import React, {useState, useEffect} from 'react'

const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY

const Search = ({handleInput}) => {
  return(
    <div>
      find countries<input onInput={handleInput}/>
    </div>
  )
}

const Results = ({matches, onClick}) => {
  if (matches.length === 1) {
    return(
      <CountyInfo country={matches[0]} />
    )
  } else if (matches.length > 10) {
    return(
      <div>Too many matches, specity another filter</div>
    )
  }
  return(
    <div>
      {matches.map(match => {
        return(
          <div key={match.name}>
            {match.name}<button onClick={onClick(match)}>show</button>
          </div>
        )})}
    </div>
  )
}

const CountyInfo = ({country}) => {
  const [weather, setWeather] = useState([])
  const loadWeather = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(loadWeather, [country])

  return(
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}<br />
        population {country.population}
      </p>
      <Languages country={country} />
      <img alt={''} src={country.flag} width={200}/>
      <Weather weather={weather} />
    </div>
  )
}

const Weather = ({weather}) => {
  if (weather.length !== 0) {
    return(
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>
          temperature: {weather.current.temperature}℃<br />
          <img src={weather.current.weather_icons[0]} alt='pic' /><br />
          wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </p>
      </div>
    )
  } else {
    return(<div></div>)
  }
}

const Languages = ({country}) => {
  return(
    <div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(lang => {
        return(
          <li key={lang.name}>
            {lang.name}
          </li>
        )
      })}
    </ul>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  const loadData = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(loadData, [])

  const handleInput = (event) => {
    setMatches(countries.filter(country => {
      return country.name.toLowerCase().includes(event.target.value.toLowerCase())
    }))
  }

  const handleShowClick = match => event => {
    event.preventDefault()
    setMatches([match])  
  }

  return (
    <div className="App">
      <Search handleInput={handleInput}/>
      <Results matches={matches} onClick={handleShowClick}/>
    </div>
  );
}

export default App;

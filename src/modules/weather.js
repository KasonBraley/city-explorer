const axios = require("axios")
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const cache = require("./cache.js")

class Forecast {
    constructor(description, date) {
        this.description = description
        this.date = date
    }
}

function parseWeather(city) {
    try {
        const weatherSummaries = city.data.map((day) => {
            const date = day.datetime
            const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`
            return new Forecast(description, date)
        })
        return Promise.resolve(weatherSummaries)
    } catch (err) {
        return Promise.reject(err)
    }
}

const fetchWeather = async (latitude, longitude) => {
    const key = `weather-${latitude}${longitude}`

    const API = `https://api.weatherbit.io/v2.0/forecast/daily/?lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&days=3`

    if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
        console.log("Cache hit")
    } else {
        console.log("Cache miss")
        cache[key] = {}
        cache[key].timestamp = Date.now()
        try {
            const searchedResponse = await axios.get(API)
            cache[key].data = parseWeather(searchedResponse.data)
        } catch (error) {
            console.error(error)
        }
    }
    return cache[key].data
}

async function weatherHandler(req, res) {
    const { lat, lon } = req.query
    try {
        const summaries = await fetchWeather(lat, lon)
        res.send(summaries)
    } catch (err) {
        console.error(error)
        res.status(200).send("Sorry. Something went wrong!")
    }
}

module.exports = weatherHandler

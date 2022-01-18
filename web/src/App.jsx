import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Home from "./components/home.jsx"
import CityCard from "./components/cityCard.jsx"
import Movies from "./components/movies.jsx"
import Layout from "./components/layout.jsx"
import Weather from "./components/weather.jsx"
import Map from "./components/map.jsx"

import getMovieData from "./utils/getMovieData.js"
import getForecastData from "./utils/getForecastData.js"
import getLocationData from "./utils/getLocationData.js"

const SERVER_URL = process.env.SERVER_URL

export default function App() {
    let [movies, setMovies] = useState("")
    let [forecast, setForecast] = useState("")
    let [cityData, setCityData] = useState({})
    let [error, setError] = useState("")
    let [searchQuery, setSearchQuery] = useState("")
    let [searchCount, setSearchCount] = useState(0)

    async function handleSubmit(query) {
        setSearchQuery(query)
        setSearchCount(searchCount + 1)

        if (query === searchQuery) {
            return
        }

        try {
            let locationData = await getLocationData(SERVER_URL, query)
            setCityData(locationData)

            if (locationData.lon && locationData.lat) {
                setForecast(await getForecastData(SERVER_URL, locationData))
            }

            setMovies(await getMovieData(SERVER_URL, query))
            setError("")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Layout>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            handleSubmit={handleSubmit}
                            searchQuery={searchQuery}
                            searchCount={searchCount}
                            error={error}
                        />
                    }
                />
                <Route path="movies" element={<Movies movies={movies.results} />} />
                <Route path="weather" element={<Weather />} />
            </Routes>
            {cityData?.place_id && (
                <>
                    <div className="flex justify-between">
                        <CityCard search={searchQuery} cityData={cityData} />
                        <Map cityData={cityData} />
                        <Weather forecast={forecast.data} />
                    </div>
                </>
            )}
        </Layout>
    )
}

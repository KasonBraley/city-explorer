import { useState } from "react"

import CityForm from "./components/form.jsx"
import CityCard from "./components/cityCard.jsx"
import Movies from "./components/movies.jsx"

import getMovieData from "./utils/getMovieData.js"
import getForecastData from "./utils/getForecastData.js"
import getLocationData from "./utils/getLocationData.js"

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3001"

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
        <>
            <CityForm
                handleSubmit={handleSubmit}
                searchQuery={searchQuery}
                searchCount={searchCount}
                error={error}
            />
            {cityData.place_id && (
                <CityCard
                    search={searchQuery}
                    cityData={cityData}
                    forecast={forecast.data}
                />
            )}
            <div className="allMovies">
                {movies && <Movies movies={movies.results} />}
            </div>
        </>
    )
}

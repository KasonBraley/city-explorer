import { createContext, useState } from "react"
import getMovieData from "../utils/getMovieData.js"
import getForecastData from "../utils/getForecastData.js"
import getLocationData from "../utils/getLocationData.js"

export const CityContext = createContext()

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function CityProvider(props) {
    let [movies, setMovies] = useState("")
    let [forecast, setForecast] = useState("")
    let [cityData, setCityData] = useState({})
    let [error, setError] = useState("")

    let values = {
        movies,
        forecast,
        cityData,
        error,
        getData,
    }

    async function getData(query) {
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
        <CityContext.Provider value={values}>
            {props.children}
        </CityContext.Provider>
    )
}

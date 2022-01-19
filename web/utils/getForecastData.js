import axios from "axios"

export default async function getForecastData(SERVER_URL, cityData) {
    const API = `${SERVER_URL}/weather?lon=${cityData.lon}&lat=${cityData.lat}`

    const response = await axios.get(API)
    return response.data
}

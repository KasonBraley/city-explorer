import axios from "axios"

export default async function getMovieData(SERVER_URL, query) {
    const API = `${SERVER_URL}/movies?city=${query}`

    const response = await axios.get(API)
    return response.data
}

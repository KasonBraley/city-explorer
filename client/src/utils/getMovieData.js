import axios from "axios"

export default async function getMovieData(SERVER_URL, query) {
    const API = `${SERVER_URL}/movies?query=${query}`

    try {
        const response = await axios.get(API)
        return response.data
    } catch (err) {
        throw err
    }
}

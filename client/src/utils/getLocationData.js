import axios from "axios"

export default async function getLocationData(query) {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.CITY_EXPLORER}&q=${query}&format=json&limit=1`

    try {
        const response = await axios.get(API)
        return response.data[0]
    } catch (err) {
        throw err
    }
}

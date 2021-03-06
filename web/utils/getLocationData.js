import axios from "axios"

export default async function getLocationData(SERVER_URL, query) {
    const API = `${SERVER_URL}/location?city=${query}`

    const response = await axios.get(API)
    return response.data[0]
}

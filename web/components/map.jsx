import { useContext } from "react"
import Image from "next/image"
import { CityContext } from "../context/cityContext.jsx"

export default function Map() {
    let { cityData } = useContext(CityContext)

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
    if (!cityData.place_id) return null

    console.log(`${SERVER_URL}/location/image?lat=${cityData.lat}&lon=${cityData.lon}`)
    return (
        <Image
            src={`/location/image?lat=${cityData.lat}&lon=${cityData.lon}`}
            width={384}
            height={384}
            alt="city"
            className="w-96 rounded-lg"
        />
    )
}

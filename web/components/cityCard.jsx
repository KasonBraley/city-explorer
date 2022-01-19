import { useContext } from "react"
import { CityContext } from "../context/cityContext.jsx"

export default function CityCard() {
    let { cityData } = useContext(CityContext)

    if (!cityData.place_id) return null

    return (
        <>
            <div className="w-72 m-3 mt-7">
                <span>Location Details</span>
                <div>
                    <span>{cityData.display_name}</span>
                    <ul>
                        <li>Longitude: {cityData.lon}</li>
                        <li>Latitude: {cityData.lat}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

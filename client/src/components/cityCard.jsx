import React from "react"
import Weather from "./weather.jsx"

export default function CityCard(props) {
    return (
        <div className="bg-black flex">
            <div className="w-72 m-3 mt-7 bg-white flex flex-col">
                <span>Location Details</span>
                <div>
                    <span>{props.cityData.display_name}</span>
                    <ul>
                        <li >
                            Longitude: {props.cityData.lon}
                        </li>
                        <li>
                            Latitude: {props.cityData.lat}
                        </li>
                    </ul>
                </div>
                <span className="">searched: {props.search}</span>
            </div>

            <img
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.CITY_EXPLORER}&center=${props.cityData.lat},${props.cityData.lon}`}
                alt="city"
                className="w-96 rounded-lg"
            />
            {props.forecast && <Weather forecast={props.forecast} />}
        </div>
    )
}

import React from "react"
import Error from "./error.jsx"

export default function CityForm(props) {
    function handleSubmit(event) {
        event.preventDefault()
        let city = event.target.city.value
        props.handleSubmit(city)
    }

    return (
        <form className="flex flex-col w-50" onSubmit={handleSubmit}>
            <label className="text-black">
                Search For a City
                <input type="text" placeholder="Enter city name" name="city" defaultValue="mesa"/>
            </label>
            <input
                type="submit"
                className="ml-3 bg-blue-700 w-16"
                placeholder="Explore!"
            />
            {props.error && <Error status={props.error} />}
        </form>
    )
}

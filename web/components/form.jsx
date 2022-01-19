import { useContext, useState } from "react"
import { CityContext } from "../context/cityContext.jsx"
import Error from "./error.jsx"

export default function CityForm() {
    let { error, getData } = useContext(CityContext)
    let [searchQuery, setSearchQuery] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        let city = event.target.city.value.toLowerCase()

        if (city === searchQuery) return

        setSearchQuery(city.toLowerCase())
        getData(city)
    }

    return (
        <form
            className="flex flex-col w-60 h-70 p-4 border-black border-2 m-2"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="grow p-1"
                placeholder="Enter city name"
                name="city"
                required
                // defaultValue="mesa"
            />
            <input
                type="submit"
                className="m-1 mt-4 bg-blue-400 w-16 cursor-pointer grow rounded-lg"
                placeholder="Explore!"
            />
            {error && <Error status={error} />}
        </form>
    )
}

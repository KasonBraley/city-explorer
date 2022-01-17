import Error from "./error.jsx"

export default function CityForm(props) {
    function handleSubmit(event) {
        event.preventDefault()
        let city = event.target.city.value
        props.handleSubmit(city)
    }

    return (
        <form
            className="flex flex-col w-50 h-20 border-black border-2 m-2"
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
                className="m-1 bg-blue-400 w-16 cursor-pointer grow rounded-lg"
                placeholder="Explore!"
            />
            {props.error && <Error status={props.error} />}
        </form>
    )
}

import CityForm from "./form.jsx"
import CityCard from "./cityCard.jsx"
import Weather from "./weather.jsx"
import Map from "./map.jsx"

export default function Home() {
    return (
        <>
            <CityForm />

            <div className="flex justify-between">
                <CityCard />
                <Map />
                <Weather />
            </div>
        </>
    )
}

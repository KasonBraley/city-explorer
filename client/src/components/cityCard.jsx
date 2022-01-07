export default function CityCard(props) {
    return (
        <>
            <div className="w-72 m-3 mt-7">
                <span>Location Details</span>
                <div>
                    <span>{props.cityData.display_name}</span>
                    <ul>
                        <li>Longitude: {props.cityData.lon}</li>
                        <li>Latitude: {props.cityData.lat}</li>
                    </ul>
                </div>
                <span className="">searched: {props.search}</span>
            </div>
        </>
    )
}

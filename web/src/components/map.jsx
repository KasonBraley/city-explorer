export default function Map(props) {
    return (
        <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.CITY_EXPLORER}&center=${props.cityData.lat},${props.cityData.lon}`}
            alt="city"
            className="w-96 rounded-lg"
        />
    )
}

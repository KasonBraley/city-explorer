export default function Map({ cityData }) {
    const SERVER_URL = process.env.SERVER_URL
    return (
        <img
            src={`${SERVER_URL}/location/image?lat=${cityData.lat}&lon=${cityData.lon}`}
            alt="city"
            className="w-96 rounded-lg"
        />
    )
}

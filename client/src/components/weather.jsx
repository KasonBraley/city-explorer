function WeatherDay(props) {
    return (
        <div className="bg-blue-700 text-white rounded-full self-center text-center h-2/6 w-2/6 mx-2 flex flex-col">
            <span>Forecast</span>
            <p>Details: {props.description}</p>
            <p>Temp: {props.temp} celsius</p>
        </div>
    )
}

export default function Weather(props) {
    function generateData() {
        return props.forecast?.map((element, index) => {
            return (
                <WeatherDay
                    key={index}
                    description={element.weather.description}
                    temp={element.temp}
                />
            )
        })
    }

    return <>{generateData()}</>
}

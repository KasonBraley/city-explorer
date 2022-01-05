import React from "react"

function WeatherDay(props) {
    return (
        <div className="bg-blue-700 text-white rounded-full self-center text-center h-2/6 w-2/6 mx-2">
            <span>Forecast</span>
            <span>Date: {props.date}</span>
            <p>Details: {props.description}</p>
        </div>
    )
}

export default function Weather(props) {
    function generateData() {
        return props.forecast.map((element, index) => {
            return (
                <WeatherDay
                    key={index}
                    date={element.date}
                    description={element.description}
                />
            )
        })
    }

    return <>{generateData()}</>
}

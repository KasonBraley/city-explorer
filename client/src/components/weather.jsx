import React from "react"
import Card from "react-bootstrap/Card"

function WeatherDay(props) {
    return (
        <Card
            style={{
                width: "18rem",
                height: "15rem",
                margin: "10px",
                marginTop: "30px",
            }}
            bg="primary"
            text="light"
        >
            <Card.Header>Forecast</Card.Header>
            <Card.Body>
                <Card.Title>Date: {props.date}</Card.Title>
                <p>Details: {props.description}</p>
            </Card.Body>
        </Card>
    )
}

export default function Weather(props) {
    function generateData() {
        return props.forecast.map((element, index) => {
            return (
                <WeatherDay
                    key={index}
                    data={element.date}
                    description={element.description}
                />
            )
        })
    }

    return <>{generateData()}</>
}

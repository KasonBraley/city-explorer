import React from "react";
import Card from "react-bootstrap/Card";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  generateData = () => {
    return this.props.forecast.map((element) => {
      return (
        <>
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
              <Card.Title>Date: {element.date}</Card.Title>
              <p>Details: {element.description}</p>
            </Card.Body>
          </Card>
        </>
      );
    });
  };

  render() {
    return <>{this.generateData()}</>;
  }
}

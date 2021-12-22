import React from 'react';
import Card from 'react-bootstrap/Card';

class WeatherDay extends React.Component {
  render() {
    return (
      <Card
        style={{
          width: '18rem',
          height: '15rem',
          margin: '10px',
          marginTop: '30px',
        }}
        bg="primary"
        text="light"
      >
        <Card.Header>Forecast</Card.Header>
        <Card.Body>
          <Card.Title>Date: {this.props.date}</Card.Title>
          <p>Details: {this.props.description}</p>
        </Card.Body>
      </Card>
    );
  }
}

export default class Weather extends React.Component {
  generateData = () => {
    return this.props.forecast.map((element) => {
      return (
        <WeatherDay data={element.date} description={element.description} />
      );
    });
  };

  render() {
    return <>{this.generateData()}</>;
  }
}

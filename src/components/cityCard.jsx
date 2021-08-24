import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CityCard extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem", margin: "10px", marginTop: "30px" }}>
          <Card.Header>Location Details</Card.Header>
          <Card.Body>
            <Card.Title>{this.props.cityData.display_name}</Card.Title>
            <ListGroup>
              <ListGroup.Item variant="flush">
                Longitude: {this.props.cityData.lon}
              </ListGroup.Item>
              <ListGroup.Item>
                Latitude: {this.props.cityData.lat}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer>searched: {this.props.search}</Card.Footer>
        </Card>

        <Image
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.props.cityData.lat},${this.props.cityData.lon}`}
          alt="city"
          roundedCircle
          style={{ width: "30rem" }}
        />
      </>
    );
  }
}

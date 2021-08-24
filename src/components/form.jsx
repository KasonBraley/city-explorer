import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CityForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let city = event.target.elements.formCity.value;
    this.props.handleSubmit(city);
  };

  render() {
    return (
      <Form
        style={{ margin: "10px", width: "25rem" }}
        onSubmit={this.handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city name" />
        </Form.Group>
        <Button type="submit">Explore!</Button>
      </Form>
    );
  }
}

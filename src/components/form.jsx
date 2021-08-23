import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class CityForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <Form.Group controlID="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Explore!
        </Button>
      </Form>
    );
  }
}

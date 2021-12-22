import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from './error.jsx';

export default function CityForm(props) {
  function handleSubmit(event) {
    event.preventDefault();
    let city = event.target.elements.formCity.value;
    props.handleSubmit(city);
  }

  return (
    <Form style={{ margin: '10px', width: '25rem' }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formCity">
        <Form.Label>Search For a City</Form.Label>
        <Form.Control type="text" placeholder="Enter city name" />
      </Form.Group>
      <Button type="submit">Explore!</Button>
      {props.error && <Error status={props.error} />}
    </Form>
  );
}

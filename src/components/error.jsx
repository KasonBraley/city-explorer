import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Error(props) {
  return (
    <Button variant="danger" style={{ marginLeft: '30px' }}>
      Error: {props.status}
    </Button>
  );
}

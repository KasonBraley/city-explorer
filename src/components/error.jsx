import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Error extends React.Component {
  render() {
    return (
      <Button variant="danger" style={{ marginLeft: "30px" }}>
        Error: {this.props.status}
      </Button>
    );
  }
}

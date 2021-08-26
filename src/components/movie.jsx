import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class Movie extends React.Component {
  render() {
    return (
      <div className="movie">
        {this.props.movie.image_url && (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${this.props.movie.image_url}`}
            alt={this.props.movie.title}
            className="movieImage"
          />
        )}
        <Card className="movieCard">
          <Card.Body style={{ overflowY: "scroll" }}>
            <Card.Title>{this.props.movie.title}</Card.Title>

            <ListGroup>
              <ListGroup.Item>
                Released: {this.props.movie.released_on}
              </ListGroup.Item>
              <ListGroup.Item variant="flush">
                Popularity: {this.props.movie.popularity}
              </ListGroup.Item>
              <ListGroup.Item>
                Total votes: {this.props.movie.total_votes}
              </ListGroup.Item>
              <ListGroup.Item>
                Average votes: {this.props.movie.average_votes}
              </ListGroup.Item>
            </ListGroup>

            <p>{this.props.movie.overview}</p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

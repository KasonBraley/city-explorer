import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class Movies extends React.Component {
  generateData = () => {
    return this.props.movies.map((movie) => {
      return (
        <Movie
          title={movie.title}
          image_url={movie.image_url}
          released_on={movie.released_on}
          popularity={movie.popularity}
          total_votes={movie.total_votes}
          average_votes={movie.average_votes}
          overview={movie.overview}
        />
      );
    });
  };
  render() {
    return <>{this.generateData()}</>;
  }
}

class Movie extends React.Component {
  render() {
    return (
      <div className="movie">
        {this.props.image_url && (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${this.props.image_url}`}
            alt={this.props.title}
            className="movieImage"
          />
        )}
        <Card className="movieCard">
          <Card.Body style={{ overflowY: "scroll" }}>
            <Card.Title>{this.props.title}</Card.Title>

            <ListGroup>
              <ListGroup.Item>
                Released: {this.props.released_on}
              </ListGroup.Item>
              <ListGroup.Item variant="flush">
                Popularity: {this.props.popularity}
              </ListGroup.Item>
              <ListGroup.Item>
                Total votes: {this.props.total_votes}
              </ListGroup.Item>
              <ListGroup.Item>
                Average votes: {this.props.average_votes}
              </ListGroup.Item>
            </ListGroup>

            <p>{this.props.overview}</p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

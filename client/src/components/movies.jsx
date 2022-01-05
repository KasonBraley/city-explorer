import React from "react"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Image from "react-bootstrap/Image"
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

export default function Movies({ movies }) {
    function generateData() {
        return movies.map((movie, index) => {
            return (
                <Movie
                    key={index}
                    title={movie.title}
                    image_url={movie.image_url}
                    released_on={movie.released_on}
                    popularity={movie.popularity}
                    total_votes={movie.total_votes}
                    average_votes={movie.average_votes}
                    overview={movie.overview}
                />
            )
        })
    }
    return <>{generateData()}</>
}

function Movie(props) {
    return (
        <div className="movie">
            {props.image_url && (
                <Image
                    src={`https://image.tmdb.org/t/p/w500/${props.image_url}`}
                    alt={props.title}
                    className="movieImage"
                />
            )}
            <Card className="movieCard">
                <Card.Body style={{ overflowY: "scroll" }}>
                    <Card.Title>{props.title}</Card.Title>

                    <ListGroup>
                        <ListGroup.Item>
                            Released: {props.released_on}
                        </ListGroup.Item>
                        <ListGroup.Item variant="flush">
                            Popularity: {props.popularity}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Total votes: {props.total_votes}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Average votes: {props.average_votes}
                        </ListGroup.Item>
                    </ListGroup>

                    <p>{props.overview}</p>
                </Card.Body>
            </Card>
        </div>
    )
}

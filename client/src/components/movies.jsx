import React from "react"
import "../App.css"

export default function Movies({ movies }) {
    function generateData() {
        return movies.filter((movie) => movie.image_url).map((movie, index) => {
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
    return <div className="grid grid-cols-4">{generateData()}</div>
}

function Movie(props) {
    return (
        <div className="movie flex bg-gray-300 rounded-md w-96 h-72 m-3 items-center">
            {props.image_url && (
                <img
                    src={`https://image.tmdb.org/t/p/w500/${props.image_url}`}
                    alt={props.title}
                    className="m-1 w-36 h-full"
                />
            )}
            <div className="max-h-full m-3 flex overflow-auto">
                <div>
                    <span className="text-lg">{props.title}</span>

                    <ul>
                        <li>Released: {props.released_on}</li>
                        <li>Popularity: {props.popularity}</li>
                        <li>Total votes: {props.total_votes}</li>
                        <li>Average votes: {props.average_votes}</li>
                    </ul>
                    <p className="h-40 overflow-auto">{props.overview}</p>
                </div>
            </div>
        </div>
    )
}

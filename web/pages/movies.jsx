import { useContext } from "react"
import Image from "next/image"
import { CityContext } from "../context/cityContext.jsx"

export default function Movies() {
    let { movies } = useContext(CityContext)
    function generateData() {
        return movies.results
            ?.filter((movie) => movie.poster_path)
            .map((movie, index) => {
                return (
                    <Movie
                        key={index}
                        title={movie.title}
                        image_url={movie.poster_path}
                        released_on={movie.release_date}
                        popularity={movie.popularity}
                        total_votes={movie.vote_count}
                        average_votes={movie.vote_average}
                        overview={movie.overview}
                    />
                )
            })
    }
    return (
        <div id="movies" className="grid grid-cols-4 overflow-y-scroll">
            {generateData()}
        </div>
    )
}

function Movie(props) {
    return (
        <div className="movie flex bg-gray-300 rounded-md w-96 h-72 m-3 items-center">
            {props.image_url && (
                <div className="w-36 h-full relative">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${props.image_url}`}
                        alt={props.title}
                        // width={144}
                        // height={500}
                        layout="fill"
                        // className="m-1 w-36 h-full"
                    />
                </div>
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

const axios = require("axios")
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const cache = require("./cache.js")

class Movie {
    constructor(movie) {
        this.title = movie.title
        this.overview = movie.overview
        this.average_votes = movie.vote_average
        this.total_votes = movie.vote_count
        this.image_url = movie.poster_path
        this.popularity = movie.popularity
        this.released_on = movie.release_date
    }
}

function parseMovies(city) {
    try {
        const movieObjects = city.results.map((movie) => {
            return new Movie(movie)
        })
        return Promise.resolve(movieObjects)
    } catch (err) {
        return Promise.reject(err)
    }
}

const fetchMovies = async (query) => {
    if (!query) {
        return
    }

    const key = `movie-${query}`

    const API = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`

    if (cache[key] && Date.now() - cache[key].timestamp < 500000) {
        console.log("Cache hit")
    } else {
        console.log("Cache miss")
        cache[key] = {}
        cache[key].timestamp = Date.now()
        try {
            const searchedResponse = await axios.get(API)
            cache[key].data = parseMovies(searchedResponse.data)
        } catch (err) {
            console.log(err)
        }
    }
    return cache[key].data
}

async function movieHandler(req, res) {
    const { query } = req.query
    if (!query) {
        return
    }
    try {
        const summaries = await fetchMovies(query)
        res.send(summaries)
    } catch (err) {
        console.log(err)
        res.status(200).send("Sorry. Something went wrong!")
    }
}

module.exports = movieHandler

const express = require("express")
require("dotenv").config()

const app = express()
const cors = require("cors")
app.use(cors())

const PORT = process.env.PORT || 3002

const fetchRoot = require("./modules/root.js")
const weatherHandler = require("./modules/weather.js")
const fetchMovies = require("./modules/movies.js")

app.get("/", fetchRoot)

app.get("/weather", weatherHandler)

app.get("/movies", fetchMovies)

function error(err, req, res, next) {
    console.log(err.stack)
    res.status(500)
    res.send({ error: "Something went wrong." })
}

app.use(error)

app.listen(PORT, () => {
    console.log(`Server is running, port: ${PORT}`)
})

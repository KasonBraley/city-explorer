import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./components/form.jsx";
import CityCard from "./components/cityCard.jsx";
import Movie from "./components/movie.jsx";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchCount: 0,
      error: "",
      cityData: {},
      forecast: "",
      movies: "",
    };
  }

  handleSubmit = (query) => {
    this.setState({
      searchQuery: query,
      searchCount: this.state.searchCount + 1,
    });

    if (query === this.state.searchQuery) {
      return;
    }

    this.getLocationData(query);
    this.getMovies(query);
  };

  getLocationData = async (query) => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${query}&format=json&limit=1`;

    await axios
      .get(API)
      .then((res) => {
        this.setState({ cityData: res.data[0], error: "" });
        this.getForecast();
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            cityData: {},
            movies: "",
            error: error.response.status,
          });
        }
        return;
      });
  };

  getMovies = async (query) => {
    const API = `http://localhost:3001/movies/?query=${query}`;
    await axios
      .get(API)
      .then((res) => {
        this.setState({ movies: res.data });
      })
      .catch((error) => {
        this.setState({ movies: "", error: error.response });
        console.log(error);
      });
  };

  getForecast = async () => {
    if (this.state.cityData.lon && this.state.cityData.lat) {
      const API = `http://localhost:3001/weather/?lon=${this.state.cityData.lon}&lat=${this.state.cityData.lat}`;
      await axios
        .get(API)
        .then((res) => {
          this.setState({ forecast: res.data });
        })
        .catch((error) => {
          this.setState({
            forecast: false,
            error: error.response.status,
          });
          console.log(error);
        });
    }
  };

  render() {
    return (
      <>
        <CityForm
          handleSubmit={this.handleSubmit}
          searchQuery={this.state.searchQuery}
          searchCount={this.state.searchCount}
          error={this.state.error}
        />
        {this.state.cityData.place_id && (
          <CityCard
            search={this.state.searchQuery}
            cityData={this.state.cityData}
            forecast={this.state.forecast}
          />
        )}
        <div className="allMovies">
          {this.state.movies &&
            this.state.movies.map((movie) => {
              return <Movie movie={movie} />;
            })}
        </div>
      </>
    );
  }
}

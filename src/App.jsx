import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./components/form.jsx";
import CityCard from "./components/cityCard.jsx";
// import Weather from "./components/weather.jsx";
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
    };
  }

  handleSubmit = (query) => {
    this.setState({
      searchQuery: query,
      searchCount: this.state.searchCount + 1,
    });
    this.getLocationData(query);
    // this.getForecast();
  };

  getLocationData = async (query) => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${query}&format=json&limit=1`;
    if (query === this.state.searchQuery) {
      return;
    }

    await axios
      .get(API)
      .then((res) => {
        this.setState({ cityData: res.data[0], error: "" });
        this.getForecast();
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ cityData: {}, error: error.response.status });
        }
        return;
      });
  };

  getForecast = async () => {
    if (this.state.cityData.lon && this.state.cityData.lat) {
      const API = `http://localhost:3001/weather/?searchQuery=${this.state.searchQuery}`;
      await axios
        .get(API)
        .then((res) => {
          this.setState({ forecast: res.data });
        })
        .catch((error) => {
          this.setState({ forecast: false, error: error.response.status });
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
        {/* {this.state.forecast && <Weather forecast={this.state.forecast} />} */}
      </>
    );
  }
}

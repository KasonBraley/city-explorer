import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./components/form.jsx";
import CityCard from "./components/cityCard.jsx";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchCount: 0,
      error: "",
      cityData: {},
    };
  }

  handleSubmit = (query) => {
    this.setState({
      searchQuery: query,
      searchCount: this.state.searchCount + 1,
    });
    this.getLocationData(query);
  };

  getLocationData = async (query) => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${query}&format=json&limit=1`;
    if (query === this.state.searchQuery) {
      return;
    }

    await axios
      .get(API)
      .then((res) => {
        console.log(res.data);
        this.setState({ cityData: res.data[0], error: "" });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ cityData: {}, error: error.response.status });
        }
        return;
      });
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
          />
        )}
      </>
    );
  }
}

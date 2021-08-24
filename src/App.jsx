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
      cityData: {},
    };
  }

  handleSubmit = (query) => {
    this.setState({ searchQuery: query });
    this.getLocationData(query);
  };

  getLocationData = async (query) => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${query}&format=json&limit=1`;
    const res = await axios.get(API);

    this.setState({ cityData: res.data[0] });
  };

  render() {
    return (
      <>
        <CityForm handleSubmit={this.handleSubmit} />
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

import React, { Component } from "react";
import axios from "axios";
import Rate from "./Rate";
import Graph from './Graph'
import "./Auroracoin.css";

export default class Volume extends Component {
  state = {
    auroracoin: [],
  };

  componentDidMount() {
    axios
      .get("http://apis.is/aur")
      .then((response) => {
        console.log("Auroracoin Info fetched");
        this.setState({
          auroracoin: response.data,
        });
      })
      .catch(() => {
        console.log("Error grabing auroracoin info");
      });
  }


  render() {
    const { auroracoin } = this.state;
    // console.log(auroracoin);

    return (
      <div className="body-container">
        <div className="container">
          {/* LEFT-SIDE */}
          <div className="left-side">
            <div className="title-container">
              <h1>Auroracoin to</h1>
              <Rate />
            </div>
            <Graph />
          </div>

          {/* RIGHT-SIDE */}
          <div className="box-container">
            <div className="box">
              <h3>Daily Volume</h3>
              <p>{auroracoin.volume_24h}</p>
            </div>

            <div className="box">
              <h3>Global Volume</h3>
              <p>{auroracoin.global_volume}</p>
            </div>

            <div className="box">
              <h3>Last Price</h3>
              <p>{auroracoin.last_price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

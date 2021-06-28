import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Line } from "react-chartjs-2";

export default class Graph extends Component {
  state = {
    graph: [],
  };

  componentDidMount() {
    setInterval(() => {
      axios
        .get("http://apis.is/aur")
        .then((response) => {
          //   console.log(response.data);
          axios
            .post(`${config.API_URL}/api/getInfo`, {
              volume_1h: response.data.volume_1h,
              volume_1h_buy: response.data.volume_1h_buy,
              volume_1h_sell: response.data.volume_1h_sell,
              volume_24h: response.data.volume_24h,
              volume_24h_buy: response.data.volume_24h_buy,
              volume_24h_sell: response.data.volume_24h_sell,
              ask: response.data.ask,
              bid: response.data.bid,
              daily_change: response.data.daily_change,
              daily_change_percent: response.data.daily_change_percent,
              global_units: response.data.global_units,
              global_volume: response.data.global_volume,
              last_price: response.data.last_price,
              last_transaction_type: response.data.last_transaction_type,
              market_cap: response.data.market_cap,
              max: response.data.max,
              min: response.data.min,
              open: response.data.open,
              timestampApis: response.data.timestampApis,
            })
            .then((result) => {
              console.log("updateeed");
            })
            .catch((error) => {
              console.log("fail post route");
            });
        })
        .catch(() => {
          console.log("Error Updating info");
        });
    }, 300000);

    //Info for the Graphic
    axios
      .get(`${config.API_URL}/api/wholeInfo`)
      .then((response) => {
        console.log("Whole Auroracoin Info fetched");
        this.setState({
          graph: response.data,
        });
      })
      .catch(() => {
        console.log("Error grabing auroracoin info");
      });
  }

  render() {
    const { graph } = this.state;
    //   console.log(graph)

    const data = {
      labels: [
        // graph.map((date, index) => {
        //   return `${date.timestampApis
        //     .split("T")[0]
        //     .split("-")
        //     .reverse()
        //     .join("-")}`;
        // }),
      ],

      datasets: [
        {
          label: "Evolution",
          backgroundColor: ["#51d1f6"],
          data: [
            graph.map((rate) => {
                // console.log(rate.last_price);
                return rate.last_price
            })
        ]
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Historical change ",
        },
      },
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      mantainAspectRatio: false,
    };

    return (
      <div>
        <Line
          type="line"
          data={data}
          height="80%"
          width="120%"
          options={options}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";

export default class Rate extends Component {
  state = {
    aurIsk: [],
    currency: [],
    showRate: "",
  };

  componentDidMount() {
    //Auroracoin Rates
    axios
      .get("http://apis.is/aur/history")
      .then((response) => {
        console.log("Auroracoin Rate fetched");
        this.setState({
          aurIsk: response.data.results,
        });
      })
      .catch(() => {
        console.log("Error grabing auroracoin Rate");
      });

    //Rest Currency Values
    axios
      .get("http://apis.is/currency/arion")
      .then((response) => {
        console.log("M5 Rate fetched");
        this.setState({
          currency: response.data.results,
        });
      })
      .catch(() => {
        console.log("Error grabing m5 rate");
      });
  }

  
  handleRate = (event) => {
    event.preventDefault();
    const { aurIsk, currency, showRate } = this.state;
    // console.log(aurIsk)
    let auroracoin = aurIsk[aurIsk.length - 1];
    // console.log(auroracoin.rate)
    // console.log(currency)
    let filterKey = event.target.value;

    currency.forEach((element) => {
      //   console.log(element)
      let filterArr = 0;
      if (element.shortName == filterKey) {
        filterArr += auroracoin.rate / element.value;
        //   console.log(filterArr)
        this.setState({
          showRate: filterArr.toFixed(3),
        });
      }
    });
  };

  render() {
    const { auroracoin_ISK, currency, showRate } = this.state;
    // console.log(auroracoin_ISK);
    // console.log(currency);

    return (
      <div>
        
        <div className="select-container">
          <select onChange={this.handleRate} defaultValue={"DEFAULT"}>
            <option disabled hidden value="DEFAULT">
              Choose a currency...
            </option>
                {currency.map((element, index) => {
                return (
                    <option key={index} value={element.shortName}>
                    {element.shortName}-{element.longName}
                    </option>
                );
                })}
          </select>
          <input defaultValue={showRate}></input>
        </div>
      </div>
    );
  }
}

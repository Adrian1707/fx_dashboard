import * as React from "react";
const { useState, useEffect } = React;
import { WorldMap } from "react-svg-worldmap";
import { CountryContext, Data } from "react-svg-worldmap";


export function Map({ exchangeData }) {
  const [mapData, setMapData] = useState([]);
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];

  const stylingFunction = (data) => {
    let countryCode = data.countryCode.toLowerCase()
    let country = mapData.find(item => item.country === countryCode);
    let colour = 'grey';
    if(country == undefined) {
      colour = 'grey';
    }
    if(country !== undefined) {
      if(country.value > 1) {
        console.log(country)
        colour = 'green'
      } else {
        colour = 'red'
      }
    }
    return {
      fill: colour,
      countryValue: 1,
      suffix: 1,
      prefix: 2,
    };
  };

  const mapping = {
    'USD': 'us',
    'BRL': 'br',
    'JPY': 'jp',
    'MXN': 'mx',
    'COP': 'co',
    "PEN": 'pe',
    'ZAR': 'za'
  }

  useEffect(() => {
    buildData()
  }, []);

  const collectRates = (data) => {
    let currencyCode = data.quote_currency;
    return data.quotes.map((rate, idx) => ({ code: currencyCode, rate: rate.close, day: idx}))
  }

  const floatToPercentage = (floatValue) => {
    // Calculate the percentage value
    const percentageValue = (floatValue - 1) * 100;

    // Use the toFixed method to round to the desired number of decimal places
    const roundedPercentage = percentageValue.toFixed(1);

    // Add a "+" sign for positive percentages
    const sign = floatValue > 1 ? "+" : "";

    // Concatenate the sign and the rounded percentage value
    return sign + roundedPercentage + "%";
  };


  const buildData = () => {
    console.log(exchangeData)
    const dataSet = exchangeData.map((data, index) => {
      let ratesData = collectRates(data)
      let startValue = ratesData[0].rate
      let endValue = ratesData[ratesData.length - 1].rate
      let difference = endValue / startValue
      console.log(floatToPercentage(difference))
      return { country: mapping[ratesData[0].code], value: difference}
    })
    setMapData(dataSet)
  }

  const setLineColour = () => {
    return 'red'
    const startValue = data[0].rate
    const endValue = data[data.length - 1].rate
    if(startValue >= endValue) {
      return 'red'
    } else {
      return 'green'
    }
  }

  return (
    <div className="map">
      <WorldMap
        value-suffix="people"
        size="xxl"
        data={mapData}
        styleFunction={stylingFunction}
      />
    </div>
  );
}

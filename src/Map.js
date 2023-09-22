import * as React from "react";
const { useState, useEffect } = React;
import { WorldMap } from "react-svg-worldmap";
import { CountryContext, Data } from "react-svg-worldmap";
import supportedCurrencies  from './supported_currencies.json'


export function Map({ exchangeData }) {
  const [mapData, setMapData] = useState([]);

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
      stroke: "blue",
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: "pointer",
    };
  };

  let mapping = {}

  useEffect(() => {
    buildMapping()
    buildData()
  }, []);

  const buildMapping = () => {
    // ['fr', 'de', 'es', 'pt', 'it', 'ie', 'se', 'lv', 'lt', 'ee', 'be', 'gr', 'nl'].map((code) => {
    //   mapping['EUR'] = code
    // })
    // mapping['EUR'] = ['fr', 'de', 'es', 'pt', 'it', 'ie', 'se', 'lv', 'lt', 'ee', 'be', 'gr', 'nl']
    mapping['EUR'] = 'eu'
    Object.keys(supportedCurrencies).map((rate) => {
      mapping[rate] = (rate[0] + rate[1]).toLowerCase()
    });
    mapping['EUR'] = 'eu'
  }

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
    // console.log(exchangeData)
    let euCountries = ['fr', 'de', 'es', 'hr', 'bg', 'fi', 'sk', 'si', 'at', 'pt', 'it', 'ie', 'se', 'lv', 'lt', 'ee', 'be', 'gr', 'nl']
    let euRates = exchangeData.find((data) => (
      data.quote_currency == 'EUR'
    ))
    // console.log(euRates)

    let ratesData = collectRates(euRates)
    let startValue = ratesData[0].rate
    let endValue = ratesData[ratesData.length - 1].rate
    let difference = endValue / startValue
    const euData = euCountries.map((country) => {
      return { country: country, value: difference}
    })
    const dataSet = exchangeData.map((data, index) => {
      let ratesData = collectRates(data)
      let startValue = ratesData[0].rate
      let endValue = ratesData[ratesData.length - 1].rate
      let difference = endValue / startValue
      return { country: mapping[ratesData[0].code], value: difference}
    })
    // console.log(euData + dataSet)
    // let combinedData = euData.concat(dataSet)
    let combinedData = [].concat(euData, dataSet)
    console.log(combinedData)
    setMapData(combinedData)
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

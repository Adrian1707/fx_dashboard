import * as React from 'react';
const { useState, useEffect } = React;
import countries from "@doubco/countries";
import supportedCurrencies  from './supported_currencies.json'
import Select from 'react-select'
import dayjs from 'dayjs';

export function Search({onSubmit}) {
  const getFlagEmoji = () => 'EU'.toUpperCase().replace(/./g,
    char => String.fromCodePoint(127397 + char.charCodeAt())
  );

  const getFxOptions = () => {
     let list = Object.values(countries.data)
     list = list
     .filter(country => country.currency !== 'GBP' || country.name === 'United Kingdom')
     .filter(country => country.currency !== 'USD' || country.name === 'United States')
     .filter(country => country.currency !== 'CHF' || country.name === 'Switzerland')

     console.log(list)
     return Object.entries(supportedCurrencies).map((entry) => {
      let currency = entry[0];

      let flag;
      if(currency == "EUR") {
        flag = getFlagEmoji()
      } else {
        flag = list.find(item =>  item.currency === currency ).flag
      }

      return {
        value: currency,
        label: `${flag} ${entry[1]}`,
      };
    });
  };

  const [searchedRate, setSearchedRate] = useState('');
  const [fxOptions, setFxOptions] = useState(getFxOptions())

  const filterCountriesByName = (searchString) =>
    fxOptions.filter(({ name }) => name.toLowerCase().includes(searchString.toLowerCase())
  );

  const handleInput = (event) => {
    let input = event.target.value
    input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    setFxOptions(filterCountriesByName(input))
    setSearchedRate(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    if(event.key === 'Enter' && searchedRate != ''){
      event.preventDefault();
      onSubmit(fxOptions[0].value);
    }
    setSearchedRate('');
    setFxOptions(getFxOptions())
  }

  const handleClick = (event) => {
    onSubmit(event.value);
    setFxOptions(getFxOptions())
  }

  return (
    <form onChange={handleInput} className="flex items-center">
    <div className="relative w-full mb-10 ml-14 pl-4">
      <Select
        name="fxRates"
        options={fxOptions}
        value={searchedRate}
        className="basic-multi-select"
        classNamePrefix="select"
        isClearable={true}
        onChange={handleClick}
        onKeyDown={handleSubmit}
        placeholder="Enter currency"
      />
    </div>
    </form>
  )
}

import * as React from 'react';
const { useState, useEffect } = React;
import countries from "@doubco/countries";
import Select from 'react-select'
import dayjs from 'dayjs';

export function Search({onSubmit}) {
  const getFxOptions = () => {
    return Object.values(countries.data).map((country) => ({
      value: country.currency,
      name: country.name,
      label: `${country.flag} ${country.name}`
    }));
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

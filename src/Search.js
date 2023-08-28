import * as React from 'react';
const { useState, useEffect } = React;
import Select from 'react-select'
import dayjs from 'dayjs';

export function Search({onSubmit}) {
  const [searchedRate, setSearchedRate] = useState('');
  const fxOptions = [
    { value: 'THB', label: 'THB' },
    { value: 'MXN', label: 'MXN' },
    { value: 'PHP', label: 'PHP' }
  ]

  const handleInput = (event) => {
    setSearchedRate(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    if(event.key === 'Enter' && searchedRate != ''){
      event.preventDefault();
      onSubmit(searchedRate);
    }
    setSearchedRate('');
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

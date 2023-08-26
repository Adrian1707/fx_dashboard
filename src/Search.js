import * as React from 'react';
const { useState, useEffect } = React;
import { fetchData } from "./FxData"
import dayjs from 'dayjs';

export function Search({onSubmit}) {
  const [searchedRate, setSearchedRate] = useState('');

  const handleInput = (event) => {
    setSearchedRate(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    onSubmit(searchedRate);
    setSearchedRate('')
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
        <label className="sr-only">Search</label>
        <div className="relative w-full mb-10 ml-14 pl-4">
         <label>
           <input value={searchedRate} onChange={handleInput} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add currency..." required/>
         </label>
        </div>
    </form>
  )
}

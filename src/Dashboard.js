import * as React from 'react';
const { useState, useEffect } = React;
import { FxRate } from "./FxRate";
import { Loader } from "./Loader";
import { fetchData } from "./FxData"
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();


export function Dashboard() {
  const [exchangeData, setExchangeData] = useState([]);
  const [searchedRate, setSearchedRate] = useState('')
  const [ratesCount, setRatesCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setRatesCount(3)
    getRates(["USD", "JPY", "BRL"])
}, []);

  const getRates = (rates) => {
    console.log("getRates")
    const fetchInitialRatesAndProcess = async (rates) => {
      const startTime = dayjs().subtract(1, "month").toDate().toISOString().split('T')[0];

      const ratesState = await Promise.all(rates.map(async (rate) => {
        const data = await fetchData(`GBP${rate}`, startTime, undefined);
        return data;
      }));

      console.log(ratesState);
      setLoading(false)
      if(exchangeData.length > 1) {
        setExchangeData([...exchangeData, ratesState]);
      } else {
        setExchangeData(ratesState)
      }

    }

    fetchInitialRatesAndProcess(rates);
  }


  const handleSubmit = (event) => {
    setLoading(true)
    getRates([searchedRate])
    setRatesCount(1)
    setSearchedRate('')
    event.preventDefault()
  }

  const handleInput = (event) => {
    setSearchedRate(event.target.value.toUpperCase())
  }

  return(
    <div>
      <div>
        <form onSubmit={handleSubmit} className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full mb-10 ml-14 pl-4">
             <label>
               <input value={searchedRate} onChange={handleInput} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add currency..." required/>
             </label>
            </div>
        </form>
        <div className="grid gap-6 lg:grid-cols-3">
        {
            exchangeData.length > 0 
        ? exchangeData.map((data, index) => (
            <FxRate key={index} fxRatesData={data} />
          ))
        : Array.from({ length: ratesCount }).map((_, index) => (
            <Loader key={index} loading={loading} />
        ))}
        </div>
      </div>
    </div>
  )
}

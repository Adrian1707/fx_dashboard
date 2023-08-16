import * as React from 'react';
const { useState, useEffect } = React;
import { FxRate } from "./FxRate";
import { fetchData } from "./FxData"
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();


export function Dashboard() {
  const [exchangeData, setExchangeData] = useState([]);
  const [searchedRate, setSearchedRate] = useState('')
   // const [fxRatesData, setFxRatesData] = useState([]);

  useEffect(() => {
    fetchFxData("USD")
}, []);

  const fetchFxData = (rate) => {
    const fetchDataAndProcess = async (rate) => {
      const startTime = dayjs().subtract('1', "month").toDate().toISOString().split('T')[0]
      const data = await fetchData(`GBP${rate}`, startTime, undefined);
      if (data) {
        setExchangeData([...exchangeData, data]);
      }
    };

    fetchDataAndProcess(rate);
  }

  const handleSubmit = (event) => {
    fetchFxData(searchedRate)
    setSearchedRate('')
    event.preventDefault()
  }

  const handleInput = (event) => {
    setSearchedRate(event.target.value.toUpperCase())
  }

  return(
    <div>
    { exchangeData &&
      (
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
          {exchangeData && exchangeData.map((data, index) => (
            <FxRate key={index} fxRatesData={data} />
            )
            )
          }
          </div>
        </div>
      )
    }
    </div>
  )
}

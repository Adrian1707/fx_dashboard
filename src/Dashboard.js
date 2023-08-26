import * as React from 'react';
const { useState, useEffect } = React;
import { FxRate } from "./FxRate";
import { Loader } from "./Loader";
import { Search } from "./Search";
import { fetchData, getRates } from "./FxData"
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

export function Dashboard() {
  const [exchangeData, setExchangeData] = useState([]);
  const [searchedRate, setSearchedRate] = useState('')
  const [ratesLoadingCount, setRatesLoadingCount] = useState(0)

  useEffect(() => {
    const rates = ["USD", "JPY", "BRL"]
    setRatesLoadingCount(rates.length)
    getRates(rates, updateExchangeData)
}, []);

  const updateExchangeData = (ratesState) => {
    setRatesLoadingCount(0)
    if(exchangeData.length > 1) {
      exchangeData.push(ratesState[0])
      setExchangeData(exchangeData);
    } else {
      setExchangeData(ratesState)
    }
  }

  const handleSearchSubmit = (searchedRate) => {
    setRatesLoadingCount(1);
    getRates([searchedRate], updateExchangeData);
  };

  return(
    <div>
      <div>
        <Search onSubmit={handleSearchSubmit} />
        <div className="grid gap-6 lg:grid-cols-3">
           {exchangeData &&
             exchangeData.map((data, index) => (
               <FxRate key={index} fxRatesData={data} />
             ))}
           {Array.from({ length: ratesLoadingCount }).map((_, index) => (
             <Loader key={index} />
           ))}
        </div>
      </div>
    </div>
  )
}

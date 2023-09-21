import * as React from 'react';
const { useState, useEffect } = React;
import { Dashboard } from "./Dashboard";
import { Map } from "./Map";
import { fetchData, getRates } from "./FxData"
import supportedCurrencies  from './supported_currencies.json'

export function App() {
  const [page, setPage] = useState('charts')
  const [exchangeData, setExchangeData] = useState([]);

  useEffect(() => {
    const rates = Object.keys(supportedCurrencies)
    console.log(rates)
    getRates(rates, updateExchangeData)
}, []);

  const updateExchangeData = (ratesState) => {
    if(exchangeData.length > 1) {
      exchangeData.push(ratesState[0])
      setExchangeData(exchangeData);
    } else {
      setExchangeData(ratesState)
    }
  }

  const handlePageChange = (page) => {
    setPage(page);
  };

  return(
    <div>
      <div className="nav">
        <ul className="flex">
        <li className="mr-6">
          <a className="text-blue-500 hover:text-blue-800" href="#" onClick={() => handlePageChange('charts')}>Charts</a>
        </li>
        <li className="mr-6 mapLink">
          <a className="text-blue-500 hover:text-blue-800" href="#"  onClick={() => handlePageChange('map')}>Map</a>
        </li>
        </ul>
      </div>
      <div className="container my-24 mx-auto md:px-6">
        <h1 className="mb-12 text-6xl text-center text-emerald-600 bold underline">
          FX Dashboard
        </h1>
        {page === 'charts' ? <Dashboard /> : null}
        {page === 'map' ? <Map exchangeData={exchangeData} /> : null}
      </div>
    </div>
  )
}

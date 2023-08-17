import * as React from 'react';
const { useState, useEffect } = React;
import Chart from "./Chart";
import { Loader } from "./Loader";
import { fetchData } from "./FxData"
import dayjs from 'dayjs';

export function FxRate({fxRatesData}) {
  const [fxData, setFxData] = useState(fxRatesData)

  useEffect(() => {
    const ratesStuff = collectRates(fxData)
    setRates(ratesStuff);
  }, [])

  const formatCurrencyPair = () => {
    return `${fxData.base_currency}/${fxData.quote_currency}`
  }

  const timeChange = async (num, timeType, foo) => {
    const startTime = dayjs().subtract(num, timeType).toDate().toISOString().split('T')[0]
    const newData = await fetchData(formatCurrencyPair().replace("/", ""), startTime, foo)
    setFxData(newData)
    const updatedRates = collectRates(newData);
    setRates(updatedRates)
  }


  const collectRates = (data) => {
    return data.quotes.map((rate, idx) => ({ rate: rate.close, day: idx, name: formatCurrencyPair() }))
  }

  const [currencyPair, setCurrencyPair] = useState(formatCurrencyPair)
  const [rates, setRates] = useState([])

  return(
    <div className='zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat'>
      {rates.length > 0 && <Chart data={rates} /> }
      <div className="ml-14 pl-14 w-80 h-6 space-x-12">
        <span className="cursor-pointer" onClick={() => timeChange(1, 'day')}>1d</span>
        <span className="cursor-pointer" onClick={() => timeChange(5, 'day', "week")}>5d</span>
        <span className="cursor-pointer" onClick={() => timeChange(1, 'month', "month")}>1m</span>
        <span className="cursor-pointer" onClick={() => timeChange(1, 'year', "year")}>1y</span>
        <span className="cursor-pointer" onClick={() => timeChange(5, 'year')}>5y</span>
      </div>
    </div>
  )
}

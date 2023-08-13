import * as React from 'react';
const { useState } = React;
import Chart from "./Chart";
import { fetchData } from "./FxData"
import dayjs from 'dayjs';

export function FxRate(data) {
  const formatCurrencyPair = () => {
    return `${data.data.base_currency}/${data.data.quote_currency}`
  }

  const timeChange = (num, timeType) => {
    const startTime = dayjs().subtract(num, timeType).toDate().toISOString().split('T')[0]
    fetchData(formatCurrencyPair().replace("/", ""), startTime)
    console.log(startTime)
  }

  const collectRates = () => {
    return data.data.quotes.map((rate, idx) => ({ rate: rate.close, day: idx, name: formatCurrencyPair() }))
  }

  const [currencyPair, setCurrencyPair] = useState(formatCurrencyPair)
  const [rates, setRates] = useState(collectRates)

  return(
    <div className='zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat'>
      <Chart data={rates} />
      <div className="ml-14 pl-14 w-80 h-6 space-x-12">
        <span className="cursor-pointer" onClick={() => timeChange(1, 'day')}>1d</span>
        <span className="cursor-pointer" onClick={() => timeChange(5, 'day')}>5d</span>
        <span className="cursor-pointer" onClick={() => timeChange(1, 'month')}>1m</span>
        <span className="cursor-pointer" onClick={() => timeChange(1, 'year')}>1y</span>
        <span className="cursor-pointer" onClick={() => timeChange(5, 'year')}>5y</span>
      </div>
    </div>
  )
}

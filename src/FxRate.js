import * as React from 'react';
const { useState } = React;
import Chart from "./Chart";

export function FxRate(data) {
  const formatCurrencyPair = () => {
    return `${data.data.base_currency}/${data.data.quote_currency}`
  }

  const collectRates = () => {
    return data.data.quotes.map((rate, idx) => ({ rate: rate.close, day: idx, name: formatCurrencyPair() }))
  }

  const [currencyPair, setCurrencyPair] = useState(formatCurrencyPair)
  const [rates, setRates] = useState(collectRates)

  return(
    <div className='zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat'>
      <Chart data={rates} />
    </div>
  )
}

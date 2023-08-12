import * as React from 'react';
const { useState } = React;
import Chart from "./Chart";

export function FxRate(data) {
  const formatCurrencyPair = () => {
    return `${data.data.base_currency}/${data.data.quote_currency}`
  }

  const collectRates = () => {
    return data.data.quotes.map((rate, idx) => ({ close: rate.close, day: idx }))
  }

  const [currencyPair, setCurrencyPair] = useState(formatCurrencyPair)
  const [rates, setRates] = useState(collectRates)

  return(
    <div className='zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat'>
    <Chart data={rates} />
       <div
         className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed">
         <div className="flex h-full items-end justify-start">
           <h5 className="m-6 text-lg font-bold text-white">
             {currencyPair}
           </h5>
         </div>
       </div>
       <div>
       </div>
    </div>
  )
}

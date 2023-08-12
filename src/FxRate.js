import * as React from 'react';
const { useState } = React;
import { LineChart, Line } from 'recharts';

export function FxRate(data) {
  const formatCurrencyPair = () => {
    return `${data.data.base_currency}/${data.data.quote_currency}`
  }

  const collectRates = () => {
    return data.data.quotes.map((rate) => rate.close)
  }

  const [currencyPair, setCurrencyPair] = useState(formatCurrencyPair)
  const [rates, setRates] = useState(collectRates)

  return(
    <div className='zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 bg-[50%]'>
      <img src="https://www.tradingwithrayner.com/wp-content/uploads/2018/10/12.png"
      className="transition duration-300 ease-linear"/>
      <a href="#!">
         <div
           className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.3)]">
           <div className="flex h-full items-end justify-start">
             <h5 className="m-6 text-lg font-bold text-white">
               {currencyPair}
             </h5>
           </div>
         </div>
         <div>
         </div>
       </a>
    </div>
  )
}

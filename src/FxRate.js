import * as React from 'react';
const { useState } = React;
import { LineChart, Line } from 'recharts';

export function FxRate() {
  const [rates, setRates] = useState([1.25, 1.27, 1.32, 1.31, 1.28])

  return(
    <div className='zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 bg-[50%]'>
      <img src="https://www.tradingwithrayner.com/wp-content/uploads/2018/10/12.png"
      className="transition duration-300 ease-linear"/>
      <a href="#!">
         <div
           class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.3)]">
           <div class="flex h-full items-end justify-start">
             <h5 class="m-6 text-lg font-bold text-white">
               GBP/USD
             </h5>
           </div>
         </div>
         <div>
         </div>
       </a>
    </div>
  )
}

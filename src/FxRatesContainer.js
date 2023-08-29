import * as React from 'react';
import { FxRate } from "./FxRate";
import { Loader } from "./Loader";

export function FxRatesContainer({exchangeData, ratesLoadingCount}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
       {exchangeData &&
         exchangeData.map((data, index) => (
           <FxRate key={index} fxRatesData={data} />
         ))}
       {Array.from({ length: ratesLoadingCount }).map((_, index) => (
         <Loader key={index} />
       ))}
    </div>
  )
}

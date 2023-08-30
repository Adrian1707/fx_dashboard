import * as React from 'react';
import { FxRate } from "./FxRate";
import { Loader } from "./Loader";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-drag";

export function FxRatesContainer({exchangeData, ratesLoadingCount}) {

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const result = swap(items, sourceIndex, targetIndex);
    return setItems(result);
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div className="rates-container">
        <GridDropZone className='dropzone' boxesPerRow={3} rowHeight={600}>
        {exchangeData &&
          exchangeData.map((data, index) => (
            <GridItem key={data.quote_currency}>
              <div className="grid-item">
                <FxRate key={index} fxRatesData={data} />
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  )
}

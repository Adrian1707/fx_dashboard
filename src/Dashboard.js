import * as React from 'react';
const { useState, useEffect } = React;
import { FxRate } from "./FxRate";
import { fetchData } from "./FxData"
import dotenv from 'dotenv';
dotenv.config();


export function Dashboard() {
  const [exchangeData, setExchangeData] = useState(null);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      const data = await fetchData("GBPTHB", "2023-14-08");
      if (data) {
        setExchangeData(data);
      }
    };

    fetchDataAndProcess();
}, []);

  return(
    <div>
    { exchangeData &&
      (
        <div className="grid gap-6 lg:grid-cols-3">
          <FxRate fxRatesData={exchangeData} />
          <FxRate fxRatesData={exchangeData} />
          <FxRate fxRatesData={exchangeData} />
        </div>
      )
    }
    </div>
  )
}

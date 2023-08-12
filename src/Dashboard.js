import * as React from 'react';
const { useState, useEffect } = React;
import { FxRate } from "./FxRate";
import exampleData from './example_data.json';
import dotenv from 'dotenv';
dotenv.config();


export function Dashboard() {
  const [exchangeData, setExchangeData] = useState(null);
  const FX_API_KEY = process.env.FX_API_KEY
  const TIME_SERIES_URL = "https://marketdata.tradermade.com/api/v1/timeseries"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use this for testing data to prevent hitting API limits
        const data = exampleData

        // const response = await fetch(
        //   `${TIME_SERIES_URL}?currency=GBPTHB&api_key=${FX_API_KEY}&start_date=2023-07-01&end_date=2023-08-10&format=records`
        // );

        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }

        // const data = await response.json(); // Parse the response
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };

    const fetchDataAndProcess = async () => {
      const data = await fetchData();
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
          <FxRate data={exchangeData} />
          <FxRate data={exchangeData} />
          <FxRate data={exchangeData} />
        </div>
      )
    }
    </div>
  )
}

import * as React from 'react';
import weekData from './5daysthb.json';
import monthData from './1monththb.json';
import yearData from './1yearthb.json';
import dayjs from 'dayjs';

const FX_API_KEY = process.env.FX_API_KEY
const TIME_SERIES_URL = "https://marketdata.tradermade.com/api/v1/timeseries"

export const fetchData = async (currencyPair, startDate, foo) => {
  try {
    // Use this for testing data to prevent hitting API limits
    let data = yearData
    if(foo == "year") {
      data = yearData
    } else if(foo == "month") {
      data = monthData
    } else if (foo == "week") {
      data = weekData
    }
    // const endDate = dayjs().toDate().toISOString().split('T')[0]
    // const response = await fetch(
    //   `${TIME_SERIES_URL}?currency=${currencyPair}&api_key=${FX_API_KEY}&start_date=${startDate}&end_date=${endDate}&format=records`
    // );
    //
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    //
    // const data = await response.json(); // Parse the response

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

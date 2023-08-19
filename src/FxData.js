import * as React from 'react';
import weekData from './5daysusd.json';
import monthData from './1monthusd.json';
import yearData from './1yearusd.json';
import dayjs from 'dayjs';
const { useState } = React;

const FX_API_KEY = process.env.FX_API_KEY
const TIME_SERIES_URL = "https://marketdata.tradermade.com/api/v1/timeseries"

export const fetchData = async (currencyPair, startDate) => {
  try {
    const endDate = dayjs().toDate().toISOString().split('T')[0]
    const url = `${TIME_SERIES_URL}?currency=${currencyPair}&api_key=${FX_API_KEY}&start_date=${startDate}&end_date=${endDate}&format=records`

    // Check if data exists in cache
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Parse the response

    // Cache the fetched data
    localStorage.setItem(url, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

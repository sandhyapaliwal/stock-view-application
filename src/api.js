// Your Alpha Vantage API key
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

// Base URL for all Alpha Vantage API requests
const BASE_URL = "https://www.alphavantage.co/query";

/* 
Fetches overview information for a stock symbol (like name, sector, industry, market cap, PE ratio) 
*/
export const getStockInfo = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    
    console.log("Raw Stock Info Data for symbol:", symbol, data);

    // Handle API-specific errors first
    if (data.Note) {
      console.error("API Limit Exceeded:", data.Note);
      return { error: "API_LIMIT_EXCEEDED" }; // Explicit error type
    }
    
    if (data["Error Message"]) {
      console.error("API Error:", data["Error Message"]);
      return { error: "INVALID_SYMBOL" }; // Changed to invalid symbol error
    }

    if (data.Information) {
      console.error("API Information message:", data.Information);
      return { error: "API_LIMIT_EXCEEDED" }; // Treat as rate limit error
    }

    // If 'Name' field is missing in the response, it's invalid data
    if (!data.Name) return { error: "INVALID_SYMBOL" };

    // Return simplified stock object
    return {
      name: data.Name,
      sector: data.Sector,
      industry: data.Industry,
      marketCap: data.MarketCapitalization,
      peRatio: data.PERatio,
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return { error: "NETWORK_ERROR" };
  }
};

/* 
Fetches daily open and close prices for the stock symbol (for charting) 
*/
export const getStockChart = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    
    console.log("Raw Chart Data for symbol:", data);

    // Handle API-specific errors first
    if (data.Note) {
      console.error("API Limit Exceeded:", data.Note);
      return { error: "API_LIMIT_EXCEEDED" };
    }
    
    if (data["Error Message"]) {
      console.error("API Error:", data["Error Message"]);
      return { error: "INVALID_SYMBOL" };
    }

    if (data.Information) {
      console.error("API Information message:", data.Information);
      return { error: "API_LIMIT_EXCEEDED" };
    }

    const timeSeries = data["Time Series (Daily)"];
    if (!timeSeries) return { error: "NO_CHART_DATA" };

    return Object.keys(timeSeries).map((date) => ({
      date,
      close: parseFloat(timeSeries[date]["4. close"]),
      open: parseFloat(timeSeries[date]["1. open"]),
    }));
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { error: "NETWORK_ERROR" };
  }
};



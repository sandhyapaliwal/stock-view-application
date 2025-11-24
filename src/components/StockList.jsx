// This component manages fetching and displaying a list of stocks, handles loading and errors, and lets users remove stocks from the list interactively.
import { useEffect, useState } from "react";
import { getStockInfo, getStockChart } from "../api";
import StockItem from "./StockItem";
//symbols: Array of stock symbols to display.
export default function StockList({ symbols, onRemove }) {
  const [stocksData, setStocksData] = useState([]);//Array holding fetched stock and chart data.
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      console.log("Symbols to fetch:", symbols);

      const promises = symbols.map(async (symbol) => {
        try {//For each symbol, fetches stock info and chart data asynchronously
          const stock = await getStockInfo(symbol);
          const chart = await getStockChart(symbol);

          // Check for API limit errors first
          if (stock?.error === "API_LIMIT_EXCEEDED" || chart?.error === "API_LIMIT_EXCEEDED") {
            throw new Error("API_LIMIT_EXCEEDED");
          }
          
          // Handle invalid symbol case
          if (stock?.error === "INVALID_SYMBOL" || chart?.error === "INVALID_SYMBOL") {
            throw new Error("INVALID_SYMBOL");
          }
//shows fetched data for each symbol.
          console.log(`Fetched data for ${symbol}:`, { stock, chart });
          return { stock: { ...stock, symbol }, chart };
        } catch (error) {
          console.error(`Error fetching ${symbol}:`, error);
          return { error: error.message, symbol };
        }
      });
//Waits for all fetches to complete/all promises to complete and logs the results
      const results = await Promise.all(promises);
      console.log("Final fetched results:", results);

      // Separate valid results and errors
      const validResults = [];
      const errors = [];

      //Iterates over results, separating valid data from errors
      results.forEach(result => {
        if (result?.error) {
          errors.push(result);
        } else if (result) {
          validResults.push(result);
        }
      });

//Updates stocksData with valid results
      setStocksData(validResults);

      // Handle errors
      const rateLimitError = errors.find(e => e.error === "API_LIMIT_EXCEEDED");
      const invalidSymbols = errors.filter(e => e.error === "INVALID_SYMBOL").map(e => e.symbol);

      if (rateLimitError) {
        setApiError("API rate limit exceeded. Please try again after 1 minute.");
      } else if (invalidSymbols.length > 0) {
        setApiError(`Invalid stock symbols: ${invalidSymbols.join(", ")}`);
      } else {
        setApiError(null);
      }

      setLoading(false);
    };

    if (symbols.length > 0) {
      fetchAllData();
    } else {
      setStocksData([]);
      setApiError(null);
      setLoading(false);
    }
  }, [symbols]);

  const handleRemove = (symbolToRemove) => {
    onRemove(symbolToRemove);
    setStocksData(prev => prev.filter(({ stock }) => stock.symbol !== symbolToRemove));
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : apiError ? (
        <div className="text-center text-red-600">
          {apiError.includes("rate limit") ? (
            <>
              ⚠️ {apiError}
              <br />
              <small>(API limits reset every 60 seconds)</small>
            </>
          ) : (
            apiError
          )}
        </div>
      ) : stocksData.length === 0 ? (
        <div className="text-center text-gray-500">No data available for the selected stocks</div>
      ) : (
        // passing data and the remove handler
        stocksData.map(({ stock, chart }) => (
          <StockItem
            key={stock.symbol}
            stock={stock}
            chartData={chart}
            onRemove={handleRemove}
          />
        ))
      )}
    </div>
  );
}





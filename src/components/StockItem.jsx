// Import React library
import React from 'react';
// Import the StockChart component to display stock price charts
import StockChart from './StockChart';

// Define the StockItem component which receives stock data, chart data, and two handler functions
export default function StockItem({ stock, chartData, onRemove, onSelect }) {
  // Log stock data and chart data to the console for debugging purposes
  console.log("Stock Item Data:", stock);
  console.log("Chart Data:", chartData);

  // If no stock data is provided or stock is invalid, show a fallback message
  if (!stock || stock.error) {
    return (
      <div className="text-center text-red-600">
        {stock?.error === "INVALID_SYMBOL"
          ? `Invalid stock symbol${stock?.symbol ? `: ${stock.symbol}` : ""}`
          : "Stock data is unavailable"}
      </div>
    );
  }

  // Destructure important fields from the stock object for easier access
  const { name, sector, industry, marketCap, peRatio, symbol } = stock;

  // Return the JSX structure
  return (
    // Outer div - clickable area that triggers onSelect when clicked, passing the stock's symbol
    <div onClick={() => onSelect?.(symbol)} className="p-6 bg-surface rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Top section - stock information and remove button */}
      <div className="flex justify-between items-start">
        <div>
          {/* Display stock details */}
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Sector:</strong> {sector}</p>
          <p><strong>Industry:</strong> {industry}</p>
          <p><strong>Market Cap:</strong> {marketCap}</p>
          <p><strong>PE Ratio:</strong> {peRatio}</p>
        </div>

        {/* Remove button to delete the stock from the list */}
        <button
          onClick={(e) => { 
            e.stopPropagation(); // Stop click event from bubbling up to the outer div
            console.log("Removing stock:", symbol);
            onRemove(symbol); // Call onRemove handler with the stock symbol
          }}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>

      {/* Bottom section - chart or fallback message */}
      <div className="mt-4">
        {/* If chartData is available and not empty, display the StockChart component */}
        {chartData && chartData.length > 0 ? (
          <StockChart chartData={chartData} />
        ) : (
          // If no chartData, show a message
          <div className="text-center text-gray-500">No chart data available for this stock</div>
        )}
      </div>
    </div>
  );
}





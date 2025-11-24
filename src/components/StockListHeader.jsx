//when user input symbol and clicks 'add stock' button then 
//handleSubmit function is called and inside handleSubmit function, symbol is given to onAddStock 
//function(is a prop passed by App.jsx) . in App.jsx onAddStock is pointing to a function called 
//handleAddStock which includes symbol to stocks list.


// Import React and useState hook
import React, { useState } from "react";

// Define the StockListHeader component which takes a function 'onAddStock' as a prop
export default function StockListHeader({ onAddStock }) {
  // 1-symbol entered by user 
  const [symbol, setSymbol] = useState("");
// Function to handle the Add Stock button click
  const handleSubmit = () => {
    if (symbol) {
      onAddStock(symbol); // // on addstock is a prop passed from app.jsx(in above function) 
      setSymbol(""); // Clear the input field after adding the stock
    }
  };

  // JSX to render the input and button
  return (
    <div className="flex justify-between items-center gap-4">
      {/* Input field to type the stock symbol */}
      <input
        type="text"
        value={symbol} // Bind input value to the 'symbol' state
        onChange={(e) => setSymbol(e.target.value)} // Update symbol state as user types
        className="p-2 rounded-md border border-gray-400"
        placeholder="Enter Stock Symbol"
      />

      {/* Button to trigger adding the stock */}
      <button
        onClick={handleSubmit} // Call handleSubmit when button is clicked
        className="bg-primary text-white px-5 py-3 rounded-md"
      >
        Add Stock
      </button>
    </div>
  );
}

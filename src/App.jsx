import React, { useState, useEffect } from "react";
import StockList from "./components/StockList";//Displays stock details in a table.
import StockListHeader from "./components/StockListHeader";// Input box to add a stock.
import TodaysDate from "./components/TodaysDate"; // <-- Add this line
import { getStockInfo, getStockChart } from "./api"; // Assuming you have api.js for fetching stock data
import StockChart from "./components/StockChart";//Displays the line chart for selected stock

export default function App() {
  const [stocks, setStocks] = useState([]); // stocks-array of stock symbols
  const [stockData, setStockData] = useState({}); // [object]Stores the stock info for each symbol
  const [chartData, setChartData] = useState({}); //[object] Stores the chart data for each stock
  const [selectedStock, setSelectedStock] = useState(null); //[string] The currently selected stock

  // Function is called from stocklistheader to add symbol to the stocklist and it is added when
  //symbol is not empty and not already added. stock is list where all symbols are added
  const handleAddStock = (symbol) => {
    if (symbol && !stocks.includes(symbol)) {
      setStocks([...stocks, symbol]);//adds new symbol
      console.log("Added stock symbol:", symbol); // Log when a stock is added
    }
  };
//just as a new symbol is added in stocks useeffect triggers
  // Fetch data and chart for each stock symbol whenever the stocks list changes
  useEffect(() => {
    const fetchStockData = async () => {
      const fetchedStockData = {};//symbol info like name, sector, industry, PE ratio, etc.
      const fetchedChartData = {};//historical chart data (price over time)
//getStockInfo() and getStockChart() is called from api.js to get symbols infortamtion and chart data.
      // Loop through each stock symbol and fetch both the stock info and chart data
      for (const symbol of stocks) {//We loop through each stock symbol in the array
        const stockInfo = await getStockInfo(symbol);// API call for info
        const chart = await getStockChart(symbol);// API call for chart

        // Save the data if available
        if (stockInfo) {
          fetchedStockData[symbol] = stockInfo;//symbol info is stored in symbol of  fetchedstockdata beacuse fetchedstockdata is empty so we created a key named symbol
        }
        if (chart.length > 0) {
          fetchedChartData[symbol] = chart;//chart data is stored in symbol of fetchedchartdata
        }
      }

      //After all symbols are processed, we update the state with the full fetched data
      setStockData(fetchedStockData);
      setChartData(fetchedChartData);
    };
//We call fetchStockData() only if at least one symbol exists.
    if (stocks.length > 0) {
      fetchStockData();
    }
  }, [stocks]); // Trigger the effect when the stocks array changes means when new symbol entered


//Updates which stock’s chart is displayed.
const handleSelectStock = (symbol) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="min-h-screen bg-custom-bg text-light-text">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-extrabold text-dark-accent text-center mb-6 drop-shadow">
          📈 STOCK-VIEW
        </h1>
        <div className="text-center mb-6">
          <TodaysDate />
        </div>

{/* Shows the input box and button for entering a stock symbol.
The onAddStock prop is a function (handleAddStock) from App.jsx that adds the symbol to your list when the user clicks "Add Stock".*/}
        <div className="stock-list-header">
          <StockListHeader onAddStock={handleAddStock} />{/* */}
        </div>



{/*display list of all added stocks.
sending symbols,stockData,chartData,onRemove to StockList.*/}
        <div className="stock-list">
          <StockList
            symbols={stocks}
            stockData={stockData}
            chartData={chartData}
           onRemove={(symbol) => {//delete stock from list
             setStocks((prevStocks) => prevStocks.filter((stock) => stock !== symbol));}}
              onSelect={handleSelectStock} //means that when a stock is clicked in the list, handleSelectStock will be called with that stock’s symbol.
          />
        </div>

{/* Conditional rendering of stock chart.
this block is only visible if 
-a stock is selected
-there is info and chart data for stock
-chart data array is not empty.
*/}
        {selectedStock && stockData[selectedStock] && chartData[selectedStock] && chartData[selectedStock].length > 0 && (
          <div className="stock-chart-container mt-8">
            <h2 className="text-2xl text-center text-dark-accent font-semibold mb-4">
              {selectedStock} Chart
            </h2>
            <div className="stock-item">
              <StockChart chartData={chartData[selectedStock]} />{/*App.jsx  is sending data to StockChart which he recieved from api.js . so that StockChart.jsx can make chart from it. */}
            </div>
          </div>
        )}

{/*If a stock is selected but there’s no chart data (API failed, symbol invalid, or no data available), it shows a message to the user instead of a blank area */}
        {selectedStock && (!chartData[selectedStock] || chartData[selectedStock].length === 0) && (
          <div className="text-center text-gray-500 mt-4">No chart data available for {selectedStock}</div>
        )}
      </div>
    </div>
  );
}

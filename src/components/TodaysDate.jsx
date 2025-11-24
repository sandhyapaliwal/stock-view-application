export default function TodaysDate() {//TodaysDate is a fumctional component
  const today = new Date().toLocaleDateString();//date is a object and toLocaleDateString() automatically adapts to the user's language and region (e.g., "April 17, 2025").
  return <div className="bg-blue-200 text-black px-3 py-1 rounded-md text-sm">{today}</div>;
}
//this component file returns a div that display current date
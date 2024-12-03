import React from 'react';

export default function Exposure({ percentage }) {
  // Color of the bar depending on the exposure percentage
  const getBarColor = (percentage) => {
    if (percentage < 30) {
      return 'bg-green-500'; // Green for low exposure
    } else if (percentage < 70) {
      return 'bg-yellow-500'; // Yellow for medium exposure
    } else {
      return 'bg-red-500'; // Red for high exposure
    }
  };

  return (
    <div>
      <h1 className="text-md font-semibold text-gray-200 mb-2">Radiation Exposure:  {percentage}%</h1>
      
      <div className="w-3/5 max-w-md mb-6">
        <div className="w-full h-8 bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getBarColor(percentage)} hover:animate-pulse`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <br />
        <hr />

      </div>
    </div>
  );
}
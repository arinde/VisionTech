import React from 'react';

const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-500 mb-4"></div>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

export default Spinner;

import React from 'react';

const FooterLoader = () => (
  <div className="w-full py-8 flex flex-col items-center justify-center space-y-3">
    <div className="relative w-10 h-10">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="text-sm font-medium text-slate-500 animate-pulse">Loading more products...</p>
  </div>
);

export default FooterLoader;

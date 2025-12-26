import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="aspect-[4/3] bg-slate-200 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 bg-slate-200 rounded w-1/4 animate-pulse" />
        <div className="h-8 bg-slate-200 rounded w-1/3 animate-pulse" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;

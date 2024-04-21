import React from "react";

const Loader = () => {
  return (
    <div className="flex gap-2 justify-center w-full flex-wrap">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="border shadow rounded-md p-4 min-w-52 h-32">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded" />
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2" />
                  <div className="h-2 bg-slate-200 rounded col-span-1" />
                </div>
                <div className="h-2 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;

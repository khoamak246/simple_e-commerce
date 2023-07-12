import React, { useEffect, useState } from "react";

export default function Password() {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);
  return (
    <div
      className={`${
        isActive ? "w-[95%]" : "w-0"
      }  h-[95%] flex flex-col gap-5 duration-200 transition-all overflow-hidden`}
    >
      <div className="w-full flex flex-col gap-5">
        <p className="font-semibold underline">PASSWORD:</p>
        {/* Current password */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Current password:</h2>
          <input
            type="text"
            placeholder="Current password..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
          />
        </div>

        {/* New password */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">New password:</h2>
          <input
            type="text"
            placeholder="New password..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
          />
        </div>
      </div>
      {/* Button */}
      <div className="flex w-full gap-3">
        <button className="bg-orange-200 py-1 px-6 rounded-2xl hover:scale-95 duration-200 transition-all">
          Save
        </button>
        <button className="bg-slate-300 py-1 px-6 rounded-2xl hover:scale-95 duration-200 transition-all">
          Reset
        </button>
      </div>
    </div>
  );
}

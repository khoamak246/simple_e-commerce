import React, { useEffect, useState } from "react";

export default function Personal() {
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
      }  h-[95%] flex flex-col justify-around duration-200 transition-all overflow-hidden`}
    >
      <div className="w-full flex flex-col gap-5">
        <p className="font-semibold underline">PERSONAL:</p>
        {/* Full Name */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Full name:</h2>
          <input
            type="text"
            placeholder="Full name..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
          />
        </div>
        {/* Email */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Email:</h2>
          <input
            type="text"
            placeholder="Email..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
          />
        </div>
        {/* Phone Number */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Phone number:</h2>
          <input
            type="text"
            placeholder="Phone number..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
          />
        </div>

        {/* Gender */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Gender:</h2>
          <div className="flex items-center gap-8">
            <div className="flex gap-1">
              <input type="radio" />
              <p>None</p>
            </div>
            <div className="flex gap-1">
              <input type="radio" />
              <p>Female</p>
            </div>
            <div className="flex gap-1">
              <input type="radio" />
              <p>Male</p>
            </div>
          </div>
        </div>

        {/* DateOfBirth */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Date of birth:</h2>
          <input
            type="date"
            placeholder="Phone number..."
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

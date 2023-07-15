import React from "react";

export default function DshBusinessItems({ business }) {
  return (
    <div className="w-full flex justify-between items-center py-1 px-3 cursor-pointer hover:bg-slate-100">
      <p className="text-sm">{business.name}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-4 h-4 ${business.subBusiness.length === 0 && "hidden"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

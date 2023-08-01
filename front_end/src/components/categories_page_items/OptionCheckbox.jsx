import React from "react";
import { useLocation } from "react-router-dom";

export default function OptionCheckbox({ data, selectValue }) {
  const location = useLocation();
  return (
    <div className="w-full flex flex-col py-6 text-sm gap-3 border-slate-400 border-b-[1px] border-solid">
      <h2>{data.title}</h2>
      <div className="w-full flex flex-col gap-3">
        {data.option.map((val, index) => {
          return (
            <div key={val.id} className="flex gap-1 items-center">
              <input
                type="checkbox"
                onChange={() => selectValue(val.value)}
                checked={location.search.includes(val.value.slice(1))}
              />
              <p>{val.optionName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

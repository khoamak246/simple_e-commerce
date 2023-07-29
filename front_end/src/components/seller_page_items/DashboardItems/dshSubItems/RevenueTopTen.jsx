import React from "react";

export default function RevenueTopTen({ data }) {
  return (
    <>
      {data ? (
        <div className="h-[10%] w-full grid grid-cols-3 border-slate-400 border-b-[1px] border-solid items-center">
          <div className="h-full col-span-1 pl-2 font-semibold border-slate-400 border-r-[1px] border-solid items-center flex">
            <p>{data.order.createdDate}</p>
          </div>
          <div
            className={`col-span-2 h-full flex items-center pl-2 font-semibold`}
          >
            <p>{data.price * data.quantity}$</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

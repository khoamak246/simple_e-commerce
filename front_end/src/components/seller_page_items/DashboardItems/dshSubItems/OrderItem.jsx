import React from "react";

export default function OrderItem() {
    
  return (
    <div className="w-full h-[8vh] grid grid-cols-10 border-solid border-slate-400 border-b-[1px] cursor-pointer">
      {[
        "Order id",
        "Product id",
        "Product name",
        "Price",
        "Quantity",
        "Total",
        "Payment way",
        "Action",
      ].map((val, index, arr) => {
        if (index !== 2 && index !== 6) {
          return (
            <div
              key={index}
              className={`flex justify-center items-center ${
                index !== arr.length - 1 &&
                "border-solid border-slate-400 border-r-[1px]"
              }`}
            >
              <p>{val}</p>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="col-span-2 flex justify-center items-center border-solid border-slate-400 border-r-[1px]"
            >
              <p>{val}</p>
            </div>
          );
        }
      })}
    </div>
  );
}

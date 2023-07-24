import React from "react";
import { Link } from "react-router-dom";
import OrderItem from "./dshSubItems/OrderItem";
import { useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";


export default function DshAllOrder() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  return (
    <div className="w-full h-full flex flex-col gap-2 pb-2">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
          All product:
        </h1>
      </div>
      <div className="pl-2 h-[95%] w-full justify-center items-center">
        <div className="w-[98%] h-[98%] shadow-lg border-solid border-slate-400 border-[1px] flex flex-col">
          {/* NAV */}
          <div className="w-full h-[15%] flex justify-center items-center border-solid border-slate-400 border-b-[1px]">
            <div className="flex flex-col gap-1 w-[50%]">
              <p className="w-full text-center font-semibold">Date</p>
              <div className="flex gap-2 w-full">
                <div className="w-[49%]">
                  <input
                    name="minPrice"
                    type="text"
                    placeholder="From..."
                    className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                  />
                </div>
                <p className="w-[2%]"> - </p>
                <div className="w-[49%]">
                  <input
                    name="maxPrice"
                    type="text"
                    placeholder="To..."
                    className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* TABLE */}
          <div className="w-full h-[85%] flex flex-col justify-center items-center">
            <div className="w-full h-[20%] border-solid border-slate-400 border-b-[1px]">
              <div className="w-full h-[50%] grid grid-cols-6 border-solid border-slate-400 border-b-[1px]">
                {["All order", "Waiting Confirm", "Delevery", "Done"].map(
                  (val, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-center items-center cursor-pointer border-solid border-slate-400 border-r-[1px]"
                      >
                        {val}
                      </div>
                    );
                  }
                )}
                <Link
                  to={"/seller/dashboard/orderMng/cancellationForm"}
                  className="flex justify-center items-center border-solid border-slate-400 border-r-[1px]
                  bg-slate-200"
                >
                  Cancel
                </Link>
                <Link
                  to={"/seller/dashboard/orderMng/return-refund"}
                  className="flex justify-center items-center"
                >
                  Return/Refund
                </Link>
              </div>
              <div className="w-full h-[50%] grid grid-cols-10">
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
            </div>
            <div className="w-full h-[80%] overflow-auto">
              <OrderItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

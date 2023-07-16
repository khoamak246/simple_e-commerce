import React from "react";
import ProductCard from "../../card/ProductCard";

export default function DshShopCollection() {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2">Shop Collection:</h1>
      </div>
      <div className="pl-2 w-full h-[95%]">
        <div className="w-[95%] h-[95%] border-solid border-[1px] border-slate-400 grid grid-cols-3">
          {/* COLLECTION NAME */}
          <div className="h-full grid-cols-1 col-span-1 overflow-auto border-r-[1px] border-solid border-slate-400">
            {/* TITLE */}
            <div className="flex items-center w-full gap-2 py-2 pl-2 border-b-[1px] border-solid border-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 hidden sm:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                />
              </svg>
              <h2 className="font-semibold">Collection</h2>
            </div>
            {/* ITEMS */}
            {[1, 1, 1, 1, 1].map((val, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-between cursor-pointer border-solid border-b-[1px]  border-slate-400 items-center py-2 px-2 duration-200 transition-all hover:bg-slate-200"
                >
                  <p className="text-sm text-slate-400">Product</p>
                  <div className="flex gap-1 items-center">
                    <p className="text-sm text-[#F04D2D]">9</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-slate-400 hidden sm:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          {/* PRODUCT */}
          <div className="col-span-2 h-full">
            {/* NAV */}
            <div className="items-center w-full gap-2 py-2 px-2 border-b-[1px] border-solid border-slate-400 grid grid-cols-5">
              {/* TITLE */}
              <div className="flex gap-1 items-center col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 hidden lg:block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                <h2 className="font-semibold">Product</h2>
              </div>

              <div className="col-span-4 grid grid-cols-2 gap-2">
                {/* SEARCH */}
                <div className="w-full h-full flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border-[1px] border-solid border-slate-400 outline-none rounded-sm text-sm px-1 w-full"
                    maxLength={120}
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 items-center">
                  {/* SORT */}
                  <div className="w-full h-[90%] border-solid border-[1px] border-slate-400 flex justify-between items-center px-1 cursor-pointer rounded-sm">
                    <p className="text-sm">Sort by</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 hidden lg:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                  {/* PAGE */}
                  <div className="w-full h-full grid grid-cols-2 items-center gap-1">
                    <div className="text-sm w-full flex justify-end">
                      <p>0/12</p>
                    </div>
                    <div className=" w-full h-full grid grid-cols-2 border-[1px] border-solid border-slate-200">
                      <div className="flex justify-center items-center bg-slate-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-center items-center cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCT */}
            <div className="h-[90%] overflow-auto grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
              {[1, 1, 1, 1, 1].map((val, index) => {
                return (
                  <div key={index}>
                    <ProductCard />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

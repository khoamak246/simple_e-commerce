import React from "react";

export default function DshAllProduct() {
  return (
    <div className="w-full h-full flex flex-col gap-2 pb-2">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
          All product:
        </h1>
      </div>
      <div className="pl-2 h-[95%] w-full">
        <div className="w-[98%] h-[98%] shadow-lg border-solid border-slate-400 border-[1px] flex flex-col">
          <div className="h-5/12 lg:2/6 border-solid border-slate-400 border-b-[1px] grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
            {/* COL_1 */}
            <div className="w-full h-full flex flex-col items-center gap-2">
              {/* NAME */}
              <div className="flex flex-col gap-1 w-full">
                <p>Name: </p>
                <input
                  type="text"
                  placeholder="Product name..."
                  className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                  maxLength={120}
                />
              </div>
              {/* BUSINESS */}
              <div className="flex flex-col gap-1 w-full">
                <p>Business: </p>
                <div className="border-[1px] h-[47%] border-solid border-slate-400 flex items-center justify-center rounded-sm">
                  <p
                    className={`p-2 text-sm w-[90%] outline-none cursor-pointer ${
                      null === null && "text-slate-400"
                    }`}
                  >
                    Hello
                  </p>
                  <div className="w-[20%] sm:w-[10%] flex justify-center border-l-[1px] border-solid border-slate-400 items-center h-full cursor-default">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-slate-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* COL_2 */}
            <div className="w-full h-full flex flex-col items-center gap-2">
              {/* PRICE */}
              <div className="flex flex-col gap-1 w-full">
                <p>Price: </p>
                <div className="flex gap-2 w-full">
                  <div className="w-[49%]">
                    <input
                      type="text"
                      placeholder="From..."
                      className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                      maxLength={120}
                    />
                  </div>
                  <p className="w-[2%]"> - </p>
                  <div className="w-[49%]">
                    <input
                      type="text"
                      placeholder="To..."
                      className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
              {/* SORT BY */}
              <div className="flex flex-col gap-1 w-full">
                <p>Sort by: </p>
                <select className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm">
                  <option value="" key="">
                    -- nothing --
                  </option>{" "}
                  <option value="" key="">
                    All product
                  </option>{" "}
                  <option value="" key="">
                    On Sale
                  </option>
                  <option value="" key="">
                    Not sale
                  </option>{" "}
                </select>
              </div>
            </div>
            {/* BUTTON */}
            <div className="flex gap-2">
              <button className="px-3 rounded-lg bg-orange-400 text-white">
                Filter
              </button>
              <button className="px-3 rounded-lg bg-slate-400 text-white">
                Reset
              </button>
            </div>
          </div>
          <div className="h-7/12 lg:h-4/6 w-full">
            {/* HEADER */}
            <div className="lg:h-1/6 w-full border-solid border-slate-400 border-b-[1px] grid grid-cols-8">
              <div className="col-span-3 flex gap-1 items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <input type="checkbox" />
                <p className="text-[0.7rem] lg:text-base">Product name</p>
              </div>
              <div className="col-span-2 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <p className="text-[0.7rem] lg:text-base">Business</p>
              </div>
              <div className="col-span-1 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <p className="text-[0.7rem] lg:text-base">Price</p>
              </div>
              <div className="col-span-1 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <p className="text-[0.7rem] lg:text-base">Stock</p>
              </div>
              <div className="col-span-1 flex items-center lg:px-2 text-[0.7rem] lg:text-base">
                Action
              </div>
            </div>
            {/* BODY */}
            <div className="h-5/6 w-full flex justify-center items-center overflow-auto">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fempty_state.png?alt=media&token=3e8e6738-c13f-48e7-809d-40d425854635"
                alt=""
                className="w-[30%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

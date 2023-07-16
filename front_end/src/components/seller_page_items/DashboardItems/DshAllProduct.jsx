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
          <div className="h-2/6 border-solid border-slate-400 border-b-[1px] grid grid-cols-2 gap-2 p-2">
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
                <div className="border-[1px] border-solid border-slate-400 flex items-center justify-center rounded-sm">
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
            <div>Hello</div>
          </div>
          <div className="h-4/6"></div>
        </div>
      </div>
    </div>
  );
}

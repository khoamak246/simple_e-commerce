import React from "react";

export default function Slidetrack() {
  return (
    <div className="w-full mt-10 overflow-hidden flex justify-center items-center px-5">
      <div className="w-[95%] bg-white flex flex-col p-2 gap-2 relative">
        <p className="text-xl font-semibold px-2">Popular</p>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {[1, 1, 1, 1, 1].map((val, index) => {
            return (
              <div
                className="w-full flex justify-center items-center"
                key={index}
              >
                <div className="w-[95%] h-[300px] rounded-sm overflow-hidden p-2 shadow-md border-slate-200 border-solid border-[1px]">
                  <div className="h-[70%] w-full flex justify-center items-center shadow-sm bg-white cursor-pointer">
                    <img
                      src="https://m.media-amazon.com/images/I/41Wg3ic2F1L._AC_SY400_.jpg"
                      alt=""
                      className="h-full rounded-sm"
                    />
                  </div>
                  <div className="h-[30%] flex flex-col w-full justify-end">
                    <p className="text-lg font-semibold">
                      <sup className="text-md">$</sup> 260
                    </p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      Covergirl Lash Blast Cleantopia Mascara, Volumizing,
                      Smudge-Proof, Vegan Formula, Black 805, 0.32oz
                    </p>
                    <div className="w-full flex justify-end">
                      <div className="max-w-fit flex justify-end items-center gap-1 py-1 group">
                        <p className="w-0 px-0 group-hover:w-auto group-hover:px-2 h-5 text-sm bg-red-400  rounded-lg text-white font-semibold overflow-hidden duration-500 transition-all ease-in-out">
                          Shopping now
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 group-hover:text-[#C7511F]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute top-[50%] left-0 cursor-pointer ml-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="absolute top-[50%] right-0 cursor-pointer mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-8 h-8"
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
  );
}

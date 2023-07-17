import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function FavoriteModal() {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);

  return (
    <div
      className={`${
        isActive ? "w-[25vw] h-auto pb-2" : "w-0 h-0"
      } bg-white absolute top-[8%] right-[12%] flex flex-col rounded-md overflow-hidden z-50 shadow-lg duration-200 transition-all`}
    >
      {/* NAV */}
      <div className="w-full flex justify-between items-center border-slate-400 border-b-[1px] border-solid py-1 px-2 bg-[#d41831c7] text-white">
        <div className="cursor-pointer">
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
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <p className="font-semibold">
          <span>(0)</span> products
        </p>
      </div>
      {/* PRODUCT */}
      <div className="w-full flex flex-col gap-2 px-2 py-1">
        {[1, 1, 1, 1, 1].map((val, index) => {
          return (
            <div
              key={index}
              className="w-full h-[10vh] flex cursor-pointer border-solid border-slate-400 border-[1px] rounded-md overflow-hidden group"
            >
              <div className="w-full group-hover:w-[95%] flex duration-200 transition-all">
                <div className="w-[20%]">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/userAssets%2Fdownload%20(1).jpgbb43db16-f6c0-4647-a3aa-7f152078c54c?alt=media&token=9cdbed89-3099-4750-af48-b980882a113d"
                    alt=""
                    className="w-16 h-16"
                  />
                </div>
                <div className="w-[80%] flex">
                  <div className="flex flex-col w-[80%] justify-center">
                    <p className="font-semibold">Chao chong dinh</p>
                    <p className="flex text-sm items-center text-[#EE4D2D]">
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
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                      4.9/5.0
                    </p>
                  </div>
                  <div className="w-[20%] flex justify-center items-center text-[#EE4D2D] font-semibold">
                    400$
                  </div>
                </div>
              </div>
              <div className="w-0 group-hover:w-[5%] bg-slate-300 flex items-center duration-200 transition-all">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

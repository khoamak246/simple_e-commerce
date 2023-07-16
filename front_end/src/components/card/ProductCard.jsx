import React from "react";

export default function ProductCard() {
  return (
    <div className="h-[40vh] flex flex-col w-full shadow-lg border-slate-200 border-solid border-[1px] cursor-pointer duration-300 transition-all hover:scale-95">
      <div className="w-full h-[50%] shadow-sm ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/userAssets%2Fdownload%20(1).jpgbb43db16-f6c0-4647-a3aa-7f152078c54c?alt=media&token=9cdbed89-3099-4750-af48-b980882a113d"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="w-full h-[50%] flex flex-col px-3 py-1 rounded-sm overflow-hidden">
        <div className="h-1/3 block-ellipsis text-[0.7rem] lg:text-sm">
          <p>
            Capo chuyen dung cho dan heheheh lafm the nao ma ngan can duoc tui
          </p>
        </div>
        <div className="text-lg w-full h-1/3 text-[#F06246] flex items-center">
          <p>39.000 $</p>
        </div>
        <div className="text-sm h-1/3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex">
            {[1, 1, 1, 1, 1].map((val, index) => {
              return (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              );
            })}
          </div>
          <p className="text-[0.7rem] lg:text-sm">Da ban 100</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import StarRated from "./StarRated";

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
          <StarRated scale={1} />
          <p className="text-[0.7rem] lg:text-sm">Da ban 100</p>
        </div>
      </div>
    </div>
  );
}

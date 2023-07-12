import React from "react";

export default function SingleImgCard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] bg-white h-full p-3 flex flex-col gap-3 rounded-sm overflow-hidden cursor-pointer ">
        <p className="text-xl font-bold">Beauty picks</p>
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_2x._SY608_CB432774344_.jpg"
          alt=""
          className="w-full h-[90%]"
        />

        <p className="text-sm text-[#147C8F] hover:text-[#C7511F] cursor-pointer">
          Shop now
        </p>
      </div>
    </div>
  );
}

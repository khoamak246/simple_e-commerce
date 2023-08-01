import React from "react";
import { Link } from "react-router-dom";

export default function SingleImgCard({ card }) {
  return (
    <Link
      to={`${card.url}`}
      className="w-full flex justify-center items-center"
    >
      <div className="w-[90%] bg-white h-full p-3 flex flex-col gap-3 rounded-sm overflow-hidden cursor-pointer ">
        <p className="text-xl font-bold">{card.title}</p>
        <img src={card.img} alt="" className="w-full h-[90%]" />

        <p className="text-sm text-[#147C8F] hover:text-[#C7511F] cursor-pointer">
          Shop now
        </p>
      </div>
    </Link>
  );
}

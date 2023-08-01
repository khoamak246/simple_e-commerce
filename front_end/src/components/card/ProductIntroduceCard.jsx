import React from "react";
import { Link } from "react-router-dom";

export default function ProductIntroduceCard({ productIntro }) {
  return (
    <div className="cursor-pointer relative group">
      <Link
        to={productIntro.url}
        className="w-full h-0 group-hover:h-full absolute top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center overflow-hidden duration-500 transition-all ease-in-out"
      >
        <h1 className="text-[2.4rem] italic text-white font-serif">
          {productIntro.title}
        </h1>
        <h2 className="text-xl italic font-serif w-[70%] text-center text-white">
          {productIntro.subTitle}
        </h2>
      </Link>
      <img src={productIntro.img} alt="" className="w-full h-full" />
      <button className="group-hover:hidden border-white border-[1px] border-solid absolute bottom-3 right-3 text-white py-2 px-4 rounded-2xl font-serif text-sm">
        Shopping
      </button>
    </div>
  );
}

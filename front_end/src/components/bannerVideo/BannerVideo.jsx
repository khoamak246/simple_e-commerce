import React from "react";
import { Link } from "react-router-dom";

export default function BannerVideo({ isReverse, banner }) {
  return (
    <div className="w-full overflow-hidden flex justify-center items-center px-5 cursor-pointer">
      <div className="w-[95%] bg-white flex flex-col md:flex-row">
        {!isReverse ? (
          <>
            <div className="w-full md:w-[50%]">
              <video
                src={banner.video}
                muted={true}
                autoPlay={true}
                playsInline={true}
                loop={true}
                className="h-full"
              ></video>
            </div>
            <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-2">
              <h1 className="text-[2.4rem] italic text-[#F3A847] font-serif">
                {banner.title}
              </h1>
              <h2 className="text-xl italic font-serif w-[70%] text-center">
                {banner.subTitle}
              </h2>
              <Link
                to={banner.url}
                className="bg-slate-500 text-white py-1 md:py-2 px-4 rounded-2xl font-serif hover:bg-slate-400 mb-2 md:mb-0"
              >
                Explored now
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-2">
              <h1 className="text-[2.4rem] italic text-[#F3A847] font-serif">
                {banner.title}
              </h1>
              <h2 className="text-xl italic font-serif w-[70%] text-center">
                {banner.subTitle}
              </h2>
              <Link
                to={banner.url}
                className="bg-slate-500 text-white py-1 md:py-2 px-4 rounded-2xl font-serif hover:bg-slate-400 mb-2 md:mb-0"
              >
                Explored now
              </Link>
            </div>
            <div className="w-full md:w-[50%]">
              <video
                src={banner.video}
                muted={true}
                autoPlay={true}
                playsInline={true}
                loop={true}
                className="h-full"
              ></video>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

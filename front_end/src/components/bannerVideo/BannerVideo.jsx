import React from "react";

export default function BannerVideo({ isReverse }) {
  return (
    <div className="w-full overflow-hidden flex justify-center items-center px-5 cursor-pointer">
      <div className="w-[95%] bg-white flex flex-col md:flex-row">
        {!isReverse ? (
          <>
            <div className="w-full md:w-[50%]">
              <video
                src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FhomePage%2FBeauty_Ad_Video.mp4?alt=media&token=f7217c64-1d04-4aff-9c45-070406ae5835"
                muted={true}
                autoPlay={true}
                playsInline={true}
                loop={true}
                className="h-full"
              ></video>
            </div>
            <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-2">
              <h1 className="text-[2.4rem] italic text-[#F3A847] font-serif">
                Beauty
              </h1>
              <h2 className="text-xl italic font-serif w-[70%] text-center">
                Join us to find out how to emphasize your own beauty
              </h2>
              <button className="bg-slate-500 text-white py-1 md:py-2 px-4 rounded-2xl font-serif hover:bg-slate-400 mb-2 md:mb-0">
                Explored now
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-2">
              <h1 className="text-[2.4rem] italic text-[#F3A847] font-serif">
                Beauty
              </h1>
              <h2 className="text-xl italic font-serif w-[70%] text-center">
                Join us to find out how to emphasize your own beauty
              </h2>
              <button className="bg-slate-500 text-white py-1 md:py-2 px-4 rounded-2xl font-serif hover:bg-slate-400 mb-2 md:mb-0">
                Explored now
              </button>
            </div>
            <div className="w-full md:w-[50%]">
              <video
                src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FhomePage%2FBeauty_Ad_Video.mp4?alt=media&token=f7217c64-1d04-4aff-9c45-070406ae5835"
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

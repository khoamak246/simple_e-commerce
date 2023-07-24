import React from "react";
import Carousel from "../components/carousel/Carousel";
import SingleImgCard from "../components/card/SingleImgCard";
import Slidetrack from "../components/carousel/Slidetrack";
import BannerVideo from "../components/bannerVideo/BannerVideo";
import { bannerItemUrls } from "../assets/js/HomePageBanner";
import { bannerVideoUrls } from "../assets/js/HomePageBanner";

export default function Home() {
  return (
    <div className="w-screen">
      <div className="w-full relative">
        <Carousel />
        <div className="bg-gradient-to-t from-[#E3E6E6] w-full h-[20vh] absolute bottom-0 right-0"></div>
        <div className="hidden absolute bottom-[-10%] right-0 w-full h-[60vh] lg:grid grid-cols-4 px-5">
          {bannerItemUrls.map((val, index) => {
            return <SingleImgCard key={index} card={val} />;
          })}
        </div>
      </div>
      <div className="w-full mt-20">
        <BannerVideo banner={bannerVideoUrls[0]} />
      </div>
      <Slidetrack />
      <div className="w-full mt-10 overflow-hidden flex justify-center items-center px-5">
        <div className="w-[95%] h-auto md:h-[380px] bg-white grid grid-cols-1 md:grid-cols-3 relative gap-3">
          {[1, 1, 1].map((val, index) => {
            return (
              <div className="cursor-pointer relative group" key={index}>
                <div className="w-full h-0 group-hover:h-full absolute top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center overflow-hidden duration-500 transition-all ease-in-out">
                  <h1 className="text-[2.4rem] italic text-white font-serif">
                    Beauty
                  </h1>
                  <h2 className="text-xl italic font-serif w-[70%] text-center text-white">
                    Join us to find out how to emphasize your own beauty
                  </h2>
                </div>
                <img
                  src="https://images.ctfassets.net/uexfe9h31g3m/1luvdwLmhMwDrEDHWHjaMX/3514d31cc00c31f1a9bb536221098f2c/3_Tips_For_Making_The_Most_Of_Family_Time_In_The_Kitchen.jpg?w=2000&h=2000&fm=webp&fit=thumb&q=90"
                  alt=""
                  className="w-full h-full"
                />
                <button className="group-hover:hidden border-white border-[1px] border-solid absolute bottom-3 right-3 text-white py-2 px-4 rounded-2xl font-serif text-sm">
                  Shopping
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-10">
        <BannerVideo isReverse={true} banner={bannerVideoUrls[1]} />
      </div>
      <Slidetrack />
    </div>
  );
}

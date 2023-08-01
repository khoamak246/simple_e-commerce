import React, { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import SingleImgCard from "../components/card/SingleImgCard";
import Slidetrack from "../components/carousel/Slidetrack";
import BannerVideo from "../components/bannerVideo/BannerVideo";
import {
  bannerItemUrls,
  productIntrodure,
  bannerVideoUrls,
} from "../assets/js/HomePageBanner";
import ProductIntroduceCard from "../components/card/ProductIntroduceCard";
import { useDispatch } from "react-redux";
import { get_top_payment_product } from "../thunk/ProductThunk";

export default function Home() {
  const dispath = useDispatch();
  const [recommendList, setRecommendList] = useState({
    firstList: [],
    secondList: [],
  });

  useEffect(() => {
    dispath(get_top_payment_product({ offsetNumber: 0, limitNumber: 10 })).then(
      (res_1) => {
        if (res_1) {
          let firstList = res_1;
          let secondList = [];
          dispath(
            get_top_payment_product({ offsetNumber: 1, limitNumber: 10 })
          ).then((res_2) => {
            if (res_2) {
              secondList = res_2;
              console.log({ firstList, secondList });
              setRecommendList({ firstList, secondList });
            }
          });
        }
      }
    );
  }, []);
  console.log(recommendList);

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
      <Slidetrack data={recommendList.firstList} />
      <div className="w-full mt-10 overflow-hidden flex justify-center items-center px-5">
        <div className="w-[95%] h-auto md:h-[380px] bg-white grid grid-cols-1 md:grid-cols-3 relative gap-3">
          {productIntrodure.map((val, index) => {
            return <ProductIntroduceCard key={index} productIntro={val} />;
          })}
        </div>
      </div>
      <div className="w-full mt-10">
        <BannerVideo isReverse={true} banner={bannerVideoUrls[1]} />
      </div>
      <Slidetrack data={recommendList.secondList} />
    </div>
  );
}

import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import React, { useState } from "react";

export default function Carousel() {
  const [displaySlide, setDisplaySlide] = useState(0);
  const imgArr = [
    "https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FhomePage%2Fkitchen_banner.jpg?alt=media&token=4f2c092e-3bf1-44a5-95d9-c10b51469f37",
    "https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FhomePage%2FshopBook_banner.jpg?alt=media&token=5d52ea31-f1d7-4e81-8199-d6520cb67dff",
    "https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FhomePage%2FshopGaming_banner.jpg?alt=media&token=e477f4c5-3867-4820-b137-e57404e20536",
  ];

  const handleChangeSlide = (action) => {
    let maxSlideIndex = imgArr.length - 1;
    let nextSlideIndex;
    if (action === "up") {
      if (displaySlide === maxSlideIndex) {
        nextSlideIndex = 0;
      } else {
        nextSlideIndex = displaySlide + 1;
      }
    } else if (action === "down") {
      if (displaySlide === 0) {
        nextSlideIndex = maxSlideIndex;
      } else {
        nextSlideIndex = displaySlide - 1;
      }
    }
    setDisplaySlide(nextSlideIndex);
  };

  return (
    <div className="w-full relative flex">
      {imgArr.map((val, index) => {
        return (
          <img
            key={index}
            src={val}
            alt=""
            draggable={false}
            className={`${
              displaySlide === index ? "w-full" : "w-0"
            } duration-300 transition-all h-[500px]`}
          />
        );
      })}

      <div
        className="absolute top-[20%] left-0 cursor-pointer ml-5"
        onClick={() => handleChangeSlide("down")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.0}
          stroke="currentColor"
          className="w-11 h-11"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div
        className="absolute top-[20%] right-0 cursor-pointer mr-5"
        onClick={() => handleChangeSlide("up")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.0}
          stroke="currentColor"
          className="w-11 h-11"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}

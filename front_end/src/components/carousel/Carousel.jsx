import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import React, { useState } from "react";
import { useEffect } from "react";
import { caroselUrl } from "../../assets/js/HomePageBanner";
import { Link } from "react-router-dom";

export default function Carousel() {
  const [displaySlide, setDisplaySlide] = useState(0);

  const handleChangeSlide = (action) => {
    let maxSlideIndex = caroselUrl.length - 1;
    let nextSlideIndex = 0;
    if (action === "up") {
      if (displaySlide < maxSlideIndex) {
        nextSlideIndex = displaySlide + 1;
      }
    } else if (action === "down") {
      if (displaySlide > 0) {
        nextSlideIndex = displaySlide - 1;
      }
    }
    setDisplaySlide(nextSlideIndex);
  };

  useEffect(() => {
    let id = setTimeout(() => {
      handleChangeSlide("up");
    }, 5000);
    return () => clearTimeout(id);
  }, [displaySlide]);

  return (
    <div className="w-full relative flex">
      {caroselUrl.map((val, index) => {
        return (
          <Link
            to={val.url}
            key={index}
            className={`${
              displaySlide === index ? "w-full" : "w-0"
            } duration-300 transition-all `}
          >
            <img
              src={val.img}
              alt=""
              draggable={false}
              className={`h-[500px]`}
            />
          </Link>
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

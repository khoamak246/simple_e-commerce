import React, { useState } from "react";
import { Link } from "react-router-dom";
import PreviewImg from "../components/carousel/previewImg";

export default function ProductDetail() {
  const [selectPreviewIndex, setPreviewIndex] = useState(0);
  const previewArr = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/image%2Fy2mate.com%20-%20The%20FUNNIEST%20Animals%20Being%20Absolute%20Jerks%20Pets%20Dogs%20Cats%20Shorts_480p.mp4094bfb82-475b-401b-951c-4828a61dbd4f?alt=media&token=08f7dfb8-9cac-4c09-ad11-73c4c667e29d",
      assetType: "video",
    },
    {
      url: "https://englishlikeanative.co.uk/wp-content/uploads/2021/09/Animal-idioms-for-ESL-students-learning-English..jpg",
      assetType: "img",
    },
    {
      url: "https://englishlikeanative.co.uk/wp-content/uploads/2021/09/Animal-idioms-for-ESL-students-learning-English..jpg",
      assetType: "img",
    },
    {
      url: "https://englishlikeanative.co.uk/wp-content/uploads/2021/09/Animal-idioms-for-ESL-students-learning-English..jpg",
      assetType: "img",
    },
  ];
  return (
    <div className="w-screen flex flex-col px-5">
      {/* BUSINESS */}
      <div className="w-full flex items-center py-2">
        <Link to={"/"} className="text-blue-600">
          EON
        </Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <Link to={"/"} className="text-blue-600">
          Noi that va doi song
        </Link>
      </div>
      {/* PRODUCT PREVIEW */}
      <div className="w-full h-[80vh] bg-white rounded-sm flex gap-5">
        <div className="w-1/3 h-full border-solid border-r-[1px] border-slate-200">
          <PreviewImg previewArr={previewArr} />
          <div className="h-[10%] flex justify-center items-center border-t-[1px] border-slate-200 border-solid text-red-500 gap-1">
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <p>Like (9.2k)</p>
          </div>
        </div>
        <div className="w-2/3 flex flex-col py-2">
          <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis">
            Ghế xoay văn phòng Xfurniture C010 - hàng nhập khẩu
          </h1>
          <div className="grid grid-cols-6">
            <div className="col-span-1"></div>
            <div className="col-span-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

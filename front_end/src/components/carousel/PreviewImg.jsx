import React, { useState } from "react";

export default function PreviewImg({ previewArr }) {
  const [selectPreviewIndex, setPreviewIndex] = useState(0);
  return (
    <div className="w-full h-[90%] flex justify-center items-center">
      {/* PREVIEW */}
      <div className="w-full h-[90%]">
        <div className="h-[90%] w-full flex justify-center items-center">
          {previewArr?.map((val, index) => {
            return (
              <div
                key={index}
                className={`${
                  selectPreviewIndex === index ? "w-full" : "w-0"
                } h-[95%] bg-black bg-opacity-70 flex items-center justify-center overflow-hidden duration-500 transition-all`}
              >
                {val.assetType === "image" ? (
                  <img src={val.url} alt="" className="w-full" />
                ) : (
                  <video
                    src={val.url}
                    controls={true}
                    playsInline={true}
                    muted={true}
                    autoPlay={true}
                    className="h-full object-contain"
                  ></video>
                )}
              </div>
            );
          })}
        </div>

        {/* IMAGE LIST */}
        <div className="h-[10%] flex gap-2 justify-center">
          {previewArr.map((val, index) => {
            return (
              <div className="h-full cursor-pointer relative" key={index}>
                <div
                  className={`${
                    selectPreviewIndex !== index ? "bg-opacity-50" : "opacity-0"
                  }  w-full h-full bg-black absolute top-0 left-0 hover:opacity-0 transition-all duration-100 flex justify-center items-center z-20`}
                  onClick={() => setPreviewIndex(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 text-white ${
                      val.assetType === "image" && "hidden"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </div>
                {val.assetType === "image" ? (
                  <img src={val.url} alt="" className="h-full" />
                ) : (
                  <video src={val.url} className="h-full z-0"></video>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

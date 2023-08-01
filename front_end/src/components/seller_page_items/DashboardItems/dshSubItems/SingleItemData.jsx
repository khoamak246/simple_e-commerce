import React from "react";

export default function SingleItemData({ title, subTitle, data, index }) {
  const colorArr = [
    {
      color: "bg-gradient-to-b from-pink-600 to-pink-400",
    },
    {
      color: "bg-gradient-to-b from-blue-600 to-blue-400",
    },
    {
      color: "bg-gradient-to-b from-red-600 to-red-400",
    },
    {
      color: "bg-gradient-to-b from-yellow-600 to-yellow-400",
    },
  ];

  const handleRenderColor = () => {
    if (typeof index !== "undefined" || index !== null) {
      let nextIndex = 0;
      if (index <= colorArr.length - 1) {
        nextIndex = index;
      }
      return colorArr[nextIndex].color;
    } else {
      return "";
    }
  };
  return (
    <>
      {data !== undefined && data !== null ? (
        <div className=" flex justify-center items-center w-full h-full">
          <div
            className={`${handleRenderColor()} rounded w-[95%] h-[90%]  flex items-center hover:scale-95 duration-300 transition-all cursor-default px-2`}
          >
            <div className="w-3/4 h-full flex flex-col justify-start">
              {title && (
                <h2 className="text-white font-semibold text-xl">{title}</h2>
              )}
              {subTitle && <p className="text-white text-sm">{subTitle}</p>}
            </div>
            <div className="h-full w-1/4 flex justify-center items-center">
              {data !== undefined && data !== null && (
                <p className="text-4xl text-white font-semibold">{data}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

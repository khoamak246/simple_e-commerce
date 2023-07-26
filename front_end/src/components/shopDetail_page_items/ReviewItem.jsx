import React from "react";
import StarRated from "../card/StarRated";

export default function ReviewItem({ review }) {
  return (
    <div className="w-full flex gap-2">
      <div className="w-[10%] flex justify-end">
        <img
          src={review.userInfo.avatar}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="w-[90%] flex flex-col text-sm gap-2">
        <div className="w-full flex flex-col gap-1">
          <p>{review.userInfo.user.fullName}</p>
          <StarRated scale={1} fillStar={review.rated} />
          <p className="text-[#757575]">{`${review.createdDate} | Option: ${review.optionName}`}</p>
        </div>
        <p>{`${review.content}`}</p>
        <div className="w-full lg:w-[50%] grid grid-cols-6 justify-center items-center gap-2">
          {review.assets.map((val, index) => {
            if (val.assetType === "image") {
              return (
                <img
                  key={index}
                  src={val.url}
                  alt=""
                  className="w-full h-full"
                />
              );
            } else {
              return (
                <video
                  key={index}
                  src={val.url}
                  className="w-full h-full"
                ></video>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

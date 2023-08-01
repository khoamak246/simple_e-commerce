import React, { useMemo, useState } from "react";
import { getAvatar, getMinPrice } from "../../utils/Utils";
import { Link } from "react-router-dom";

export default function Slidetrack({ data }) {
  const [trackNumber, setTrackNumber] = useState(0);

  const totalTrack = useMemo(() => {
    let total = 1;
    if (data.length % 5 !== 0) {
      total = total + (data.length - (data.length % 5));
    } else if (data.length % 5 === 0) {
      total = data.length / 5;
    }
    return total;
  }, [data]);

  const handleRenderProduct = useMemo(() => {
    let offset = trackNumber * 5;
    let limit = (trackNumber + 1) * 5;
    let displayData = [...data];
    return displayData.splice(offset, limit);
  }, [trackNumber, data]);

  const handleOnChangeTrack = (action) => {
    if (action === "UP" && trackNumber < totalTrack - 1) {
      setTrackNumber((pre) => pre + 1);
    } else if (action === "DOWN" && trackNumber > 0) {
      setTrackNumber((pre) => pre - 1);
    }
  };

  return (
    <div className="w-full mt-10 overflow-hidden flex justify-center items-center px-5">
      <div className="w-[95%] bg-white flex flex-col p-2 gap-2 relative">
        <p className="text-xl font-semibold px-2">Popular</p>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {handleRenderProduct.map((val, index) => {
            return (
              <Link
                to={`/product/detail/${val.id}`}
                className="w-full flex justify-center items-center"
                key={val.id}
              >
                <div className="w-[95%] h-[300px] rounded-sm overflow-hidden p-2 shadow-md border-slate-200 border-solid border-[1px]">
                  <div className="h-[70%] w-full flex justify-center items-center shadow-sm bg-white cursor-pointer">
                    <img
                      src={getAvatar(val)}
                      alt=""
                      className="h-full rounded-sm"
                    />
                  </div>
                  <div className="h-[30%] flex flex-col w-full justify-end">
                    <p className="text-lg font-semibold">
                      <sup className="text-md">$</sup> {getMinPrice(val)}
                    </p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {val.name}
                    </p>
                    <div className="w-full flex justify-end">
                      <div className="max-w-fit flex justify-end items-center gap-1 py-1 group">
                        <p className="w-0 px-0 group-hover:w-auto group-hover:px-2 h-5 text-sm bg-red-400  rounded-lg text-white font-semibold overflow-hidden duration-500 transition-all ease-in-out">
                          Shopping now
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 group-hover:text-[#C7511F]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div
          className={`${
            data.length <= 5 && "hidden"
          } absolute top-[50%] left-0 cursor-pointer ml-5 bg-black/10 backdrop-blur-lg rounded-full overflow-hidden`}
          onClick={() => handleOnChangeTrack("DOWN")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div
          className={` ${
            data.length <= 5 && "hidden"
          } absolute top-[50%] right-0 cursor-pointer mr-5 bg-black/10 backdrop-blur-lg rounded-full overflow-hidden`}
          onClick={() => handleOnChangeTrack("UP")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

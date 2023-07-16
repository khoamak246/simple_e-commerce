import React from "react";
import ProductCard from "../components/card/ProductCard";

export default function ShopDetail() {
  const firstInfoBar = [
    {
      title: "Product: ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
      data: 615,
    },
    {
      title: "Follower: ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      ),
      data: 615,
    },
    {
      title: "Rate: ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ),
      data: "4 / 5",
    },
    {
      title: "Join: ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
      data: "5 năm trươc",
    },
  ];

  return (
    <div className=" w-screen">
      {/* NAV */}
      <div className="h-[33vh] bg-white">
        <div className="h-[80%] w-full flex justify-center items-center">
          <div className="w-[90%] h-[70%] grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="w-full h-full bg-orange-300 overflow-hidden relative rounded-md">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/userAssets%2F360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpg7b6b140d-b22e-4a5f-a5ed-2829d1cd6fdd?alt=media&token=97140e93-1841-4a14-8172-180a7d4edced"
                alt=""
                className="w-full h-full"
              />
              <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full flex items-center gap-3 px-5">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/userAssets%2F360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpg7b6b140d-b22e-4a5f-a5ed-2829d1cd6fdd?alt=media&token=97140e93-1841-4a14-8172-180a7d4edced"
                  alt=""
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <h2 className="text-white text-xl w-full">Anh khoa</h2>
                  <div className="w-full flex flex-col sm:flex-row gap-2">
                    <button className="w-[50%] text-white flex justify-center items-center border-white border-[1px] border-solid gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <p>Follow</p>
                    </button>
                    <button className="w-[50%] text-white flex justify-center items-center border-white border-[1px] border-solid gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>

                      <p>Chat</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden w-full h-full md:flex flex-col gap-2 justify-center">
              {firstInfoBar.map((val, index) => {
                if (index <= 1) {
                  return (
                    <div
                      className="w-full flex items-center gap-2 text-sm"
                      key={index}
                    >
                      {val.icon}
                      <p>
                        {val.title}
                        <span className="text-[#EF4D2D] font-semibold">
                          {val.data}
                        </span>
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            <div className="hidden w-full h-full md:flex flex-col gap-2 justify-center">
              {firstInfoBar.map((val, index) => {
                if (index > 1) {
                  return (
                    <div
                      className="w-full flex items-center gap-2 text-sm"
                      key={index}
                    >
                      {val.icon}
                      <p>
                        {val.title}
                        <span className="text-[#EF4D2D] font-semibold">
                          {val.data}
                        </span>
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="h-[20%] w-full flex justify-center items-center">
          <div className="w-[90%] h-full flex gap-5">
            <div className="w-[10vw] cursor-pointer border-b-[2px] border-solid border-[#EE4D2D]">
              <p className="text-center">Hello</p>
            </div>
            <div className="w-[10vw] cursor-pointer">
              <p className="text-center">hello</p>
            </div>
          </div>
        </div>
      </div>
      {/* CATALOG */}
      <div className="mt-5 w-screen flex flex-col px-5">
        <div className="w-full flex gap-3">
          <div className="w-[20%] bg-white">
            <div className="w-full flex gap-2 py-2 border-b-[1px] border-solid border-slate-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p>Danh muc</p>
            </div>
            <div className="w-full flex flex-col gap-2 py-4">
              {[1, 1].map((val, index) => {
                return (
                  <div
                    className="w-full flex gap-2 items-center text-[#EE606E] font-semibold"
                    key={index}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Hello</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[80%] bg-white">
            {/* SORT NAV */}
            <div className="w-full flex gap-2 py-2 bg-[#EDEDED] justify-between sm:px-5">
              <div className="scale-[80%] sm:scale-100 w-[70%] flex items-center gap-3">
                <p>Sort by: </p>
                {[1, 1, 1].map((val, index) => {
                  return (
                    <div
                      className="h-full w-[15%] bg-white py-1 flex justify-center items-center rounded-sm cursor-pointer"
                      key={index}
                    >
                      <p className="text-[0.7rem] sm:text-base">Hello</p>
                    </div>
                  );
                })}
                <div className="h-full bg-white py-1 w-[30%] flex justify-between items-center rounded-sm cursor-pointer px-2">
                  <p>Hello</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="scale-[80%] sm:scale-100 w-[30%] flex justify-end items-center gap-2">
                <p>1/19</p>
                <div className="h-full bg-white w-[5vw] flex justify-between items-center rounded-sm cursor-pointer">
                  <div className="w-[50%] h-full flex justify-center items-center border-r-[1px] border-solid border-slate-300 cursor-pointer bg-slate-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="w-[50%] h-full flex justify-center items-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 p-2 gap-3">
              {[1, 1, 1, 1, 1, 1].map((val, index) => {
                return (
                  <div className="w-full h-full" key={index}>
                    <ProductCard />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

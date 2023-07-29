import React from "react";
import ChatBubble from "./ChatBubble";
import { useState } from "react";
import ChatText from "./ChatText";
import ChatImg from "./ChatImg";
import ChatLoading from "./ChatLoading";

export default function Chat() {
  const [isActive, setActive] = useState(false);
  return (
    <div
      className={`fixed bottom-[2%] right-[1%] bg-white rounded-md border-[#878787a4] border-[1px] shadow-2xl shadow-[#878787] overflow-hidden ${
        isActive
          ? "w-[50vw] h-[80vh]"
          : "flex justify-center items-center gap-2 cursor-pointer w-[8vw] h-[8vh]"
      } transition-all duration-300`}
    >
      {!isActive && (
        <div
          className={`absolute top-0 left-0 w-full h-full opacity-0`}
          onClick={() => setActive(true)}
        ></div>
      )}

      {isActive ? (
        <>
          <div className="border-b-[1px] border-solid border-[#878787] w-full h-[8%] flex justify-between items-center px-3 shadow-sm">
            <p className="text-[#EF5435] text-xl font-semibold">Chat</p>
            <div className="cursor-pointer" onClick={() => setActive(false)}>
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
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-full flex">
            <div className="w-1/3 h-full border-r-[1px] border-solid border-[#878787] shadow-sm flex flex-col">
              {/* SEARCH */}
              <div className="w-full h-[10%] px-2 py-1 flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm outline-none border-solid border-slate-400 border-[1px] rounded-sm py-1 px-2"
                />
              </div>
              {/* BUBBLE */}
              <div className="w-full h-[90%] flex flex-col overflow-auto">
                {[1, 1, 1, 1].map((val, index) => {
                  return <ChatBubble key={index} />;
                })}
              </div>
            </div>
            {/* CONTENT */}
            {false ? (
              <div className="w-2/3 h-full flex justify-center items-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/nothing2.jpg?alt=media&token=bba33f2c-69b9-4097-9157-cc12c8fed2bb"
                  alt=""
                  className="w-[60%]"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="w-2/3 h-full flex flex-col">
                <div className="w-full h-[77%] flex flex-col justify-end overflow-y-auto">
                  <ChatLoading />
                </div>
                <div className="w-full h-[20%] flex flex-col">
                  <div className="w-full h-1/2 border-slate-400 border-solid border-t-[1px] border-b-[1px]">
                    <input
                      type="text"
                      placeholder="Message..."
                      className="text-sm outline-none w-full h-full px-2"
                    />
                  </div>
                  <div className="w-full h-1/2 flex justify-between  gap-2 pt-1 px-1">
                    <div className="flex gap-2">
                      {/* AVATAR */}
                      <div className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-slate-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>
                      </div>
                      {/* IMG/ VIDEO */}
                      <div className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-slate-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* SEND */}
                    <div className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-slate-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-[#EE4D2D] text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </div>
          <p className="text-[#EE4D2D]">Chat</p>
        </>
      )}
    </div>
  );
}

import React from "react";

export default function ChatBubble() {
  return (
    <div className="w-full h-[10vh] flex px-2 gap-1 cursor-pointer duration-200 transition-all hover:bg-slate-200 justify-center items-center">
      <div className="w-[20%]">
        <img
          src="https://a-z-animals.com/media/tiger_laying_hero_background.jpg"
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="w-[80%] flex flex-col">
        <div className="w-full flex justify-between">
          <div className="w-[60%] text-ellipsis whitespace-nowrap overflow-hidden">
            Hello, I'm Kha Banh
          </div>
          <div className="w-[40%] text-[#878787] text-sm">
            <p>07/07/22</p>
          </div>
        </div>
        <div className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-sm text-[#878787]">
          Oi ban oi, ban muon khoe ban phai choi do
        </div>
      </div>
    </div>
  );
}

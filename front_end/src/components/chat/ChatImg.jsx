import React from "react";

export default function ChatImg({ isUser, chat }) {
  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"}  p-2`}
    >
      <div
        className={`max-w-[70%] p-2 rounded ${
          isUser ? "bg-[#D7E4FF]" : "bg-[#F5F6F8]"
        } `}
      >
        <img
          src={chat}
          alt=""
        />
      </div>
    </div>
  );
}

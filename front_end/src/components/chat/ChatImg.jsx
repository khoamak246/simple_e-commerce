import React from "react";

export default function ChatImg({ isUser }) {
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
          src="https://media.wired.com/photos/593261cab8eb31692072f129/master/w_2560%2Cc_limit/85120553.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

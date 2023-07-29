import React from "react";

export default function ChatText({ isUser }) {
  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"}  p-2`}
    >
      <div
        className={`max-w-[70%] p-2 rounded ${
          isUser ? "bg-[#D7E4FF]" : "bg-[#F5F6F8]"
        } `}
      >
        <p>
          Mình có đặt rồi shop nha, địa chỉ của mình cũng ở HN nên shop sắp xếp
          gửi mình sớm nhá. Thích sản phẩm bên shop.
        </p>
      </div>
    </div>
  );
}

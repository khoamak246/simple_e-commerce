import React from "react";

export default function ChatLoading() {
  return (
    <div className={`w-full flex justify-end p-2`}>
      <div className={`max-w-[30%] rounded bg-[#D7E4FF]`}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/loadingGif2.gif?alt=media&token=5176c0bc-b8e8-4289-88ff-97b748fcd397"
          alt="loading-envent-img"
        />
      </div>
    </div>
  );
}

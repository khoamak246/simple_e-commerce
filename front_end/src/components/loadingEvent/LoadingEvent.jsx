import React from "react";

export default function LoadingEvent() {
  return (
    <div className="w-screen h-screen backdrop-blur-sm bg-white/30 fixed top-0 left-0 z-[999999]">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/loadingGif2.gif?alt=media&token=5176c0bc-b8e8-4289-88ff-97b748fcd397"
          alt="loading-envent-img"
          className="h-40"
        />
      </div>
    </div>
  );
}

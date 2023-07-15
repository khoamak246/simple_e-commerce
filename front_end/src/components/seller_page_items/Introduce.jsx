import React from "react";
import { Link } from "react-router-dom";

export default function Introduce() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full sm:w-[80%] sm:h-[70%] bg-white flex flex-col justify-center items-center gap-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FhomePage%2Fseller_register_ill.png?alt=media&token=ad86d1a8-2e89-4830-840b-9914dd8ab506"
          alt="seller_register_ill"
          className="w-[40%]"
          draggable={false}
        />
        <h1 className="text-2xl text-red-400 font-semibold font-serif text-center">
          Welcome to EON!
        </h1>
        <h2 className="font-serif text-lg text-center">
          To do business with EON, you need to do a few things!
        </h2>
        <Link
          to={"/seller/register"}
          className="bg-orange-300 rounded-full py-1 px-3 font-semibold text-white"
        >
          Explored now
        </Link>
      </div>
    </div>
  );
}

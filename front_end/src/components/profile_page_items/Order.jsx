import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";

export default function Order() {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);
  return (
    <div
      className={`${
        isActive ? "w-[95%]" : ""
      }  h-[95%] flex flex-col gap-5 overflow-auto`}
    >
      {[1, 1, 1, 1, 1, 1, 1].map((val, index) => {
        return <OrderItems key={index} />;
      })}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import AddressItem from "./AddressItem";

export default function Address() {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);
  return (
    <div
      className={`${
        isActive ? "w-[95%]" : "w-0"
      } h-[95%] flex flex-col gap-5 overflow-auto duration-200 transition-all`}
    >
      {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, index) => {
        return <AddressItem key={index} />;
      })}
    </div>
  );
}

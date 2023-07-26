import React, { useEffect, useState } from "react";

export default function OrderItem({ orderItem }) {
  const [displayOrderitem, setDisplayOrderItem] = useState([]);
  useEffect(() => {
    if (orderItem) {
      let orderId = orderItem.order.id;
      let productId = orderItem.productOptions.product.id;
      let productName = orderItem.productOptions.product.name;
      let option = orderItem.productOptions.name;
      let price = orderItem.price;
      let quantity = orderItem.quantity;
      let total = price * quantity;
      let paymentWay = orderItem.paymentWay.name;
      let createdDate = orderItem.order.createdDate;

      setDisplayOrderItem([
        orderId,
        productId,
        productName,
        option,
        price,
        quantity,
        total,
        paymentWay,
        createdDate,
      ]);
    }
  }, [orderItem]);
  return (
    <div className="w-full h-[8vh] grid grid-cols-12 border-solid border-slate-400 border-b-[1px]">
      {displayOrderitem.map((val, index, arr) => {
        if (index !== 2 && index !== 3 && index !== 7) {
          return (
            <div
              key={index}
              className={`flex justify-center items-center ${
                index !== arr.length - 1 &&
                "border-solid border-slate-400 border-r-[1px] text-sm"
              }`}
            >
              <p className="text-sm">{val}</p>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className={`col-span-2 flex justify-center items-center border-solid border-slate-400 border-r-[1px]`}
            >
              <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                {val}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

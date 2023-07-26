import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";
import { useSelector } from "react-redux";
import { USER_STATE_SELECTOR } from "../../redux/selectors/Selectors";
import CancelAndReturnOrderItemModal from "../modal/CancelAndReturnOrderItemModal";

export default function Order() {
  const [isActive, setActive] = useState(false);
  const userSelector = useSelector(USER_STATE_SELECTOR);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);

  const handleFilterOrderItem = () => {
    let orderItem = [];
    if (useSelector) {
      let orders = userSelector.userInfo.order;
      orders.map((e) =>
        e.orderItems.map((o) =>
          orderItem.push({ ...o, createdDate: e.createdDate })
        )
      );
    }
    return orderItem;
  };

  return (
    <div
      className={`${
        isActive ? "w-[95%]" : ""
      }  h-[95%] flex flex-col gap-5 overflow-auto`}
    >
      {handleFilterOrderItem().map((val, index) => {
        return <OrderItems key={val.id} orderItem={val} />;
      })}
    </div>
  );
}

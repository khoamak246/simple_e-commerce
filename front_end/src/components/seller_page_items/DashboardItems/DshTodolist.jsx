import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";

export default function DshTodolist() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const handleRenderOrderTodoList = () => {
    let orderTodo = [];
    if (shopSelector) {
      const {
        waitingConfirmations,
        goodsWaitingConfirmations,
        doneProcessingOrderItems,
      } = shopSelector;
      orderTodo = [
        {
          number: waitingConfirmations.length,
          title: "Waiting confirmation",
          url: "/waitingConfirm",
        },
        {
          number: goodsWaitingConfirmations.length,
          title: "Goods watting",
          url: "/waitingShipper",
        },
        {
          number: doneProcessingOrderItems.length,
          title: "Done processing",
          url: "/doneOrder",
        },
      ];
    }
    let baseUrl = "/seller/dashboard/orderMng";
    return orderTodo.map((val, index) => {
      return (
        <Link
          to={`/seller/dashboard/orderMng${val.url}`}
          className={`${
            index !== 2 && "border-r-[1px] border-solid border-slate-400"
          } w-full flex justify-center flex-col items-center hover:bg-slate-100`}
          key={index}
        >
          <h3 className="text-[#2673DD] font-semibold">{val.number}</h3>
          <p className="text-center text-[0.8rem] sm:text-base">{val.title}</p>
        </Link>
      );
    });
  };

  const handleRenderBackOrder = () => {
    let cancelOrder = [];
    if (shopSelector) {
      const { cancelOrderItems, returnOrderItems } = shopSelector;
      cancelOrder = [
        {
          number: cancelOrderItems.length,
          title: "Cancellation form",
        },
        {
          number: returnOrderItems.length,
          title: "Return/Refund form",
        },
      ];
    }

    return cancelOrder.map((val, index) => {
      return (
        <Link
          to={`/seller/dashboard/orderMng/${
            index === 0 ? "cancellationForm" : "return-refund"
          }`}
          className={`${
            index === 0 && "border-r-[1px] border-solid border-slate-400"
          } flex justify-center flex-col items-center hover:bg-slate-100`}
          key={index}
        >
          <h3 className="text-[#2673DD] font-semibold">{val.number}</h3>
          <p className="text-center text-[0.8rem] sm:text-base">{val.title}</p>
        </Link>
      );
    });
  };
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <h1 className="text-xl font-semibold p-2 h-[5%]">Dashboard:</h1>
      <div className="w-full h-[95%] flex flex-col justify-center items-center py-5">
        <div className="w-[90%] h-[90%] border-[1px] flex flex-col items-center border-solid border-slate-200 shadow-lg">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Ftodolist_removebg.png?alt=media&token=a779d2ae-d5a0-4c27-aecb-645c13520223"
            alt=""
            className="w-[20%]"
          />
          <h2 className="text-2xl text-orange-400 font-semibold">To do List</h2>
          <div className="w-full h-[50%] flex flex-col justify-center items-center gap-10">
            <div className="w-[80%] grid grid-cols-3">
              {handleRenderOrderTodoList()}
            </div>
            <div className="w-[80%] grid grid-cols-2">
              {handleRenderBackOrder()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

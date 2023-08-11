import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patch_update_order_item_status } from "../../thunk/OrderThunk";
import { toast } from "react-hot-toast";
import {
  handleAnimateToggle,
  handleCloseAnimateToggle,
  handleFindFirstImgAssetInOrderItem,
} from "../../utils/Utils";

export default function OrderItemModal({ orderItem, closeModal }) {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const [changeStatus, setChangeStatus] = useState(orderItem.status);

  useEffect(() => {
    handleAnimateToggle(setActive);
  }, []);

  const handleRenderStatus = () => {
    if (orderItem) {
      let status = orderItem.status;
      switch (status) {
        case "PREPARE":
          return [
            { status: "PREPARE", message: "On preparing goods" },
            { status: "DONE_PREPARE", message: "Done preparing" },
          ];

        case "DONE_PREPARE":
          return [
            { status: "DONE_PREPARE", message: "Done preparing" },
            { status: "DELIVERY", message: "Delivered to shipper" },
          ];
        default:
          return [
            { status, message: status },
            { status: "PAYMENT_SUCCESS", message: "Delivered successfully!" },
          ];
      }
    }
  };
  const handleCloseModal = () => {
    handleCloseAnimateToggle(setActive, closeModal);
  };

  const handleOnSubmit = () => {
    if (orderItem.staus !== changeStatus) {
      dispatch(
        patch_update_order_item_status({
          orderItemId: orderItem.id,
          orderStatusForm: {
            status: changeStatus,
          },
        })
      ).then((res) => {
        if (res) {
          toast.success("Update successfully!");
          handleCloseModal();
        }
      });
    }
  };

  return (
    <div
      className={`${
        isActive ? "w-screen h-screen" : "w-0 h-0"
      } fixed top-0 left-0  bg-black bg-opacity-50 flex justify-center items-center duration-300 transition-all z-[50] overflow-hidden`}
    >
      <div className="w-[70%] h-[70%] bg-white border-slate-200 border-[1px] border-solid shadow-lg rounded-md grid grid-cols-3 relative">
        <div
          className="absolute top-[2%] right-[2%] cursor-pointer"
          onClick={handleCloseModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="col-span-1 border-solid border-r-[1px] border-slate-400 flex flex-col justify-evenly items-center">
          {/* IMAGE */}
          <div className="w-52 h-52 overflow-hidden border-solid border-[1px] border-slate-400 rounded-md shadow-md">
            <img
              src={handleFindFirstImgAssetInOrderItem(orderItem)}
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-end items-center">
          {/* INFO */}
          <div className="w-full h-[80%] flex flex-col gap-8 px-5 justify-center">
            <p className="font-semibold text-2xl">
              {orderItem && orderItem.productOptions.product.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Created date: </span>
              {orderItem && orderItem.order.createdDate}
            </p>
            <div className="text-sm flex gap-1 items-center">
              <p className="font-semibold">Status: </p>
              {orderItem && Array.isArray(handleRenderStatus()) ? (
                <select
                  className="border-[1px] border-solid border-slate-400 rounded-sm px-2 p-1"
                  value={changeStatus}
                  onChange={(e) => setChangeStatus(e.target.value)}
                >
                  {handleRenderStatus().map((val, index) => {
                    return (
                      <option value={val.status} key={index}>
                        {val.message}
                      </option>
                    );
                  })}
                </select>
              ) : (
                handleRenderStatus()
              )}
            </div>
            {["CANCEL", "RETURN"].includes(orderItem.status) && (
              <p className="text-sm">
                <span className="font-semibold">Reason: </span>
                <span className="text-[#EE4D2D] font-semibold">
                  {orderItem && orderItem.notReceivingReason}
                </span>
              </p>
            )}
            <p className="text-sm">
              <span className="font-semibold">Product ID: </span>
              {orderItem && orderItem.productOptions.product.id}
            </p>

            <div className="w-full grid grid-cols-2">
              <p className="text-lg">
                <span className="font-semibold">Option: </span>
                {orderItem && orderItem.productOptions.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Price: </span>
                {orderItem && orderItem.price}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Quantity: </span>
                {orderItem && orderItem.quantity}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Total: </span>
                <span className="text-[#EE4D2D] font-semibold text-lg">
                  {orderItem && orderItem.quantity * orderItem.price}$
                </span>
              </p>
            </div>
          </div>
          <div className="w-full h-[13%] flex justify-end border-solid border-t-[1px] border-slate-400 py-2 px-3 gap-3">
            {!["CANCEL", "PAYMENT_SUCCESS", "RETURN"].includes(
              orderItem.status
            ) && (
              <button
                className={`button-theme px-2 rounded-md`}
                onClick={handleOnSubmit}
              >
                Confirm
              </button>
            )}

            <button
              className="px-2 rounded-md bg-slate-300"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

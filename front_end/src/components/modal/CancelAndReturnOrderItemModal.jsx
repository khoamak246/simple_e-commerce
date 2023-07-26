import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handleFindFirstImgAssetInOrderItem } from "../../utils/Utils";
import { useDispatch } from "react-redux";
import { patch_update_order_item_status } from "../../thunk/OrderThunk";
import { toast } from "react-hot-toast";

export default function CancelAndReturnOrderItemModal({
  orderItem,
  action,
  resetAction,
}) {
  const [isActive, setIsActive] = useState(false);
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (reason.length < 20) {
      return toast.error("Your reasons need more detail");
    }

    let orderStatusForm = {
      status: action,
      notReceivingReason: reason,
    };
    dispatch(
      patch_update_order_item_status({
        orderItemId: orderItem.id,
        orderStatusForm,
      })
    ).then((res) => {
      if (res) {
        toast.success("Send form successfully!");
        handleCloseModal();
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 50);
  }, []);

  const handleCloseModal = () => {
    setIsActive(false);
    setTimeout(() => {
      resetAction();
    }, 400);
  };

  return (
    <div
      className={`${
        isActive ? "w-screen h-screen" : "w-0 h-0"
      } fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-300 overflow-hidden`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      <div className="w-[50%] h-[80%] bg-white rounded-md flex flex-col justify-around items-center relative">
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
        <h1 className="text-xl">
          {`${action === "CANCEL" ? "Cancel" : "Return"}`} form
        </h1>

        <div className="w-full h-[30%] flex justify-center items-center">
          <div className="w-[80%] h-[80%] flex border-solid border-[1px] border-red-300 py-2 px-3 rounded-lg items-center justify-between ">
            <div className="flex items-center gap-3">
              <img
                src={handleFindFirstImgAssetInOrderItem(orderItem)}
                alt=""
                className="w-16 h-16"
              />

              <div>
                <p>
                  <span className="font-semibold">Order ID:</span>{" "}
                  {orderItem.id}
                </p>
                <p>
                  <span className="font-semibold">Name: </span>
                  {orderItem.productOptions.product.name}
                </p>
                <p>
                  <span className="font-semibold"> Option: </span>
                  {orderItem.productOptions.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold"> Price: </span>
                  {orderItem.price} |
                  <span className="font-semibold"> Quantity: </span>
                  {orderItem.quantity} |
                  <span className="font-semibold"> Shipping charges: </span>
                  {(orderItem.quantity * orderItem.price * 10) / 100}
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-col items-end gap-4">
              <p className="text-red-400 font-semibold text-xl">
                ${(orderItem.price * orderItem.quantity * 110) / 100}
              </p>
            </div>
          </div>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-[80%] resize-none border-[1px] border-slate-400 rounded text-sm p-1"
          placeholder="Can we ask for your reason?"
          minLength={20}
          maxLength={255}
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
        ></textarea>
        <button
          className="bg-orange-300 text-white px-5 py-2 w-[50%] rounded font-semibold"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}

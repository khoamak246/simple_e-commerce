import React from "react";
import { handleFindFirstImgAssetInOrderItem } from "../../utils/Utils";
import CancelAndReturnOrderItemModal from "../modal/CancelAndReturnOrderItemModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReviewModal from "../modal/ReviewModal";
import { useSelector } from "react-redux";
import { USER_STATE_SELECTOR } from "../../redux/selectors/Selectors";

export default function OrderItems({ orderItem }) {
  console.log(orderItem);
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const [toggleAction, setToggleAction] = useState();
  const [toggleReviewForm, setToggleReviewModal] = useState(false);
  const handleRenderOrderItemStatus = () => {
    switch (orderItem.status) {
      case "PREPARE":
        return "Waiting confirm";
      case "DONE_PREPARE":
        return "Waiting shipper";
      case "PAYMENT_SUCCESS":
        return "Delivery successful";
      case "CANCEL":
        return "Cancelled";
      case "RETURN":
        return "Return/Refund";
      case "DELIVERY":
        return "On shipping";
      default:
        return orderItem.status;
    }
  };

  const isInReturnTerm = (date) => {
    if (date) {
      let current = new Date();
      let currentTimeStamp = current.getTime();
      let dateTimeStamp = new Date(date).getTime();
      let afterSevenDayTimeStamp = current.setDate(current.getDate() + 7);
      return (
        dateTimeStamp <= currentTimeStamp &&
        currentTimeStamp <= afterSevenDayTimeStamp
      );
    }

    return false;
  };

  return (
    <div className="w-full flex border-solid border-[1px] border-red-300 py-2 px-3 rounded-lg items-center justify-between">
      <Link
        to={`/product/detail/${orderItem.productOptions.product.id}`}
        className="flex items-center gap-3"
      >
        <img
          src={handleFindFirstImgAssetInOrderItem(orderItem)}
          alt=""
          className="w-16 h-16"
        />

        <div>
          <p>
            <span className="font-semibold">Order ID:</span> {orderItem.id}
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
      </Link>
      <div className="flex justify-between flex-col items-end gap-4">
        <div className="text-sm text-green-600 flex items-center gap-2 cursor-default">
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
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <p>{handleRenderOrderItemStatus()}</p>
        </div>
        <p className="text-red-400 font-semibold text-xl">
          $
          {Math.round(
            ((orderItem.price * orderItem.quantity * 110) / 100) * 100
          ) / 100}
        </p>
        {/* CACNCEL */}
        {["PREPARE", "DONE_PREPARE"].includes(orderItem.status) && (
          <button
            className="button-theme flex items-center gap-1 py-1 px-2 rounded"
            onClick={() => setToggleAction("CANCEL")}
          >
            Cancel
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        )}
        {/* REVIEW */}
        {orderItem.status === "PAYMENT_SUCCESS" &&
          isInReturnTerm(orderItem.createdDate) && (
            <div className="flex items-center gap-1">
              {orderItem.productOptions.product.reviews.find(
                (e) => userSelector && e.userInfo.user.id === userSelector.id
              ) ? (
                ""
              ) : (
                <button
                  className="button-theme flex items-center gap-1 py-1 px-2 rounded"
                  onClick={() => {
                    setToggleReviewModal(true);
                  }}
                >
                  Review
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              )}

              {/* RETURN */}
              <button
                className="button-theme flex items-center gap-1 py-1 px-2 rounded"
                onClick={() => setToggleAction("RETURN")}
              >
                Return
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </button>
            </div>
          )}
      </div>
      {/* MODAL */}
      {toggleAction && (
        <CancelAndReturnOrderItemModal
          orderItem={orderItem}
          action={toggleAction}
          closeModal={() => setToggleAction()}
        />
      )}
      {toggleReviewForm && (
        <ReviewModal
          orderItem={orderItem}
          closeModal={() => setToggleReviewModal(false)}
        />
      )}
    </div>
  );
}

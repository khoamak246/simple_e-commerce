import React, { useEffect, useState } from "react";
import { handleFindFirstImgAssetInOrderItem } from "../../utils/Utils";
import { useDispatch } from "react-redux";
import { post_create_new_review } from "../../thunk/ReviewThunk";
import { firebase_multiple_upload } from "../../firebase/FirebaseService";
import { toast } from "react-hot-toast";
import { resetToggle, setToggle } from "../../redux/reducers/ToggleSlice";

export default function ReviewModal({ orderItem, closeModal }) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const [reivewForm, setReviewForm] = useState({
    rating: 0,
    content: "",
    assets: [],
  });
  const [hoverStar, setHoverStar] = useState();

  const handleCloseModal = () => {
    setIsActive(false);
    setTimeout(() => {
      closeModal();
    }, 400);
  };

  const handleSubmit = async () => {
    dispatch(setToggle("loading"));
    let urlArr = await firebase_multiple_upload(reivewForm.assets);
    let assets = [];
    urlArr.map((e) => {
      let tempArr = e.split("_assetType:");
      assets.push({ url: tempArr[0], assetType: tempArr[1] });
    });

    let createReviewForm = {
      content: reivewForm.content,
      rated: reivewForm.rating,
      assets,
      productId: orderItem.productOptions.product.id,
      optionName: orderItem.productOptions.name,
    };
    dispatch(post_create_new_review(createReviewForm)).then((res) => {
      if (res) {
        toast.success("Reivew sucessfully!");
        dispatch(resetToggle());
        handleCloseModal();
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 50);
  }, []);
  return (
    <div
      className={`${
        isActive ? "w-screen h-screen" : "w-0 h-0"
      } fixed top-0 left-0 bg-black bg-opacity-50 overflow-hidden flex justify-center items-center duration-300 transition-all z-[50]`}
    >
      <div className="w-[80%] h-[80%] bg-white rounded-md shadow-lg relative grid grid-cols-3 relative">
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
        <div className="col-span-1 border-solid border-r-[1px] border-slate-400 flex flex-col justify-center items-center">
          <div className="w-52 h-52 border-[1px] border-slate-400 border-solid rounded-md overflow-hidden shadow-lg p-2">
            <img
              src={handleFindFirstImgAssetInOrderItem(orderItem)}
              alt=""
              className="w-full h-full"
              draggable={false}
            />
          </div>
          <div className="w-[53%]">
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
              {orderItem.price}
            </p>
            <p>
              <span className="font-semibold"> Quantity: </span>
              {orderItem.quantity}
            </p>
            <p className="font-semibold">
              Total:
              <span className="text-red-400">
                {" "}
                {orderItem.quantity * orderItem.price}${" "}
              </span>
            </p>
          </div>
        </div>
        <div className="col-span-2 px-2 py-2 flex flex-col justify-around">
          <h2 className="font-semibold text-xl">Review:</h2>
          <p className="text-sm text-slate-400">
            Leave your review to build a friendlier buying culture with us
          </p>
          {/* UPLOAD IMG */}
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <div className="w-[50%] sm:w-[14%] font-semibold">Product img:</div>
            <div className="w-[86%]">
              <div className="border-[1px] border-dashed border-slate-400 w-20 h-20 cursor-pointer hover:bg-[#FDF3F1] flex flex-col justify-center items-center rounded-md relative">
                <input
                  id="inputImg"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  multiple={true}
                  accept="image/*, video/*"
                  onChange={(e) => {
                    setReviewForm({ ...reivewForm, assets: e.target.files });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#EE4D2D]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <p className="text-sm text-[#EE4D2D]">{`Image (${reivewForm.assets.length}/5)`}</p>
              </div>
            </div>
          </div>
          {/* RATING */}
          <div className="w-full flex gap-2">
            <p className="font-semibold">Rating:</p>
            <div className="flex">
              {[1, 1, 1, 1, 1].map((val, index) => {
                return (
                  <div
                    key={index}
                    onMouseOver={() => setHoverStar(index)}
                    onMouseOut={() => setHoverStar()}
                    onClick={() => {
                      if (reivewForm.rating === index + 1) {
                        setHoverStar();
                        setReviewForm({ ...reivewForm, rating: 0 });
                      } else {
                        setReviewForm({ ...reivewForm, rating: index + 1 });
                        setHoverStar(index);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`${
                        index <= hoverStar
                          ? "fill-red-500 text-red-500"
                          : index <= reivewForm.rating - 1
                          ? "fill-red-500 text-red-500"
                          : ""
                      } w-6 h-6 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
          {/* CONTENT */}
          <div className="w-full flex gap-2">
            <p className="font-semibold">Content: </p>
            <textarea
              name="content"
              cols="30"
              rows="10"
              className="w-[80%] resize-none border-solid border-slate-400 border-[1px] rounded outline-none text-sm px-2 py-1"
              value={reivewForm.content}
              onChange={(e) =>
                setReviewForm({ ...reivewForm, content: e.target.value })
              }
            ></textarea>
          </div>
          {/* BUTTON */}
          <div className="w-full flex justify-end gap-2">
            <button
              className="w-[15%] bg-orange-300 rounded-md px-2 py-1 text-white font-semibold"
              onClick={handleSubmit}
            >
              Send
            </button>
            <button
              className="w-[15%] bg-slate-400 rounded-md px-2 py-1 text-white font-semibold"
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

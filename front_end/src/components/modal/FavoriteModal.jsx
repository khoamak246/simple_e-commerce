import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToggle } from "../../redux/reducers/ToggleSlice";
import { USER_STATE_SELECTOR } from "../../redux/selectors/Selectors";
import {
  handleFindFirstImgAssetInProduct,
  getMinPrice,
  handleCloseAnimateToggle,
  handleAnimateToggle,
} from "../../utils/Utils";
import { post_save_favorites } from "../../thunk/ProductThunk";

export default function FavoriteModal() {
  const dispatch = useDispatch();
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    handleAnimateToggle(setActive);
  }, []);

  const closeModal = () => {
    dispatch(resetToggle());
  };

  return (
    <div
      className={`${
        isActive ? "w-[25vw] h-auto pb-2" : "w-0 h-0"
      } bg-white absolute top-[8%] right-[12%] flex flex-col rounded-md overflow-hidden z-50 shadow-lg duration-200 transition-all`}
    >
      {/* NAV */}
      <div className="w-full flex justify-between items-center border-slate-400 border-b-[1px] border-solid py-1 px-2 bg-[#d41831c7] text-white">
        <div
          className="cursor-pointer"
          onClick={() => handleCloseAnimateToggle(setActive, closeModal)}
        >
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
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <p className="font-semibold">
          <span>({userSelector.userInfo.favoritesProduct.length})</span>{" "}
          products
        </p>
      </div>
      {/* PRODUCT */}
      {userSelector.userInfo.favoritesProduct.length !== 0 ? (
        <div className="w-full flex flex-col gap-2 px-2 py-1">
          {userSelector.userInfo.favoritesProduct.map((val, index) => {
            return (
              <div
                key={val.id}
                className="w-full h-[10vh] flex cursor-pointer border-solid border-slate-400 border-[1px] rounded-md overflow-hidden group"
              >
                <div className="w-full group-hover:w-[95%] flex duration-200 transition-all">
                  <div className="w-[20%]">
                    <img
                      src={handleFindFirstImgAssetInProduct(val)}
                      alt=""
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="w-[80%] flex">
                    <div className="flex flex-col w-[80%] justify-center">
                      <p className="font-semibold">{val.name}</p>
                      <p className="flex text-sm items-center text-[#EE4D2D]">
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
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                        {val.rate}/5
                      </p>
                    </div>
                    <div className="w-[20%] flex justify-center items-center text-[#EE4D2D] font-semibold">
                      {getMinPrice(val)}$
                    </div>
                  </div>
                </div>
                {/* DISLIKE  */}
                <div
                  className="w-0 group-hover:w-[5%] bg-slate-300 flex items-center duration-200 transition-all"
                  onClick={() => dispatch(post_save_favorites(val.id))}
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fempty_state.png?alt=media&token=3e8e6738-c13f-48e7-809d-40d425854635"
          alt=""
        />
      )}
    </div>
  );
}

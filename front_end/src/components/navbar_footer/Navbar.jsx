import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileModal from "../modal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import { resetToggle, setToggle } from "../../redux/reducers/ToggleSlice";
import FavoriteModal from "../modal/FavoriteModal";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const toggleSelector = useSelector(TOGGLE_STATE_SELECTOR);
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-[#e6c191] h-[8vh] w-screen flex flex-col sm:flex-row justify-between px-5 items-center">
      <div className="flex items-center justify-center">
        <Link to={"/"} className="">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/Logo-no-bg.png?alt=media&token=b44f9a8f-8ca5-4392-8859-6cc5af37f3fc"
            alt="home-page-logo"
            className="h-[10vh]"
            draggable={false}
          />
        </Link>
        <Link
          to={"/seller/dashboard"}
          className={`${
            !location.pathname.match("/seller/dashboard/*") && "hidden"
          } text-xl pb-1 cursor-pointer`}
        >
          {" "}
          | Dashboard
        </Link>
      </div>
      <div
        className={`${
          location.pathname.match("/seller/dashboard/*") && "hidden"
        } w-[60%] h-[6vh] flex items-center`}
      >
        <input
          type="text"
          placeholder="Search EON"
          className="p-2 text-sm w-[90%] h-full rounded-l outline-none focus:border-gray-400 border-[1px] border-solid"
        />

        <div className="w-[10%] flex justify-center items-center bg-[#F3A847] py-2 h-full rounded-r">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        {/* HEART */}
        {userSelector && (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (toggleSelector !== "favorite") {
                dispatch(setToggle("favorite"));
              } else {
                dispatch(resetToggle());
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className="text-white text-xl sm:hidden">Favorite</p>
          </div>
        )}

        {/* CART */}
        {userSelector && (
          <div
            onClick={() => {
              if (userSelector.userInfo.cart.cartItems.length === 0) {
                toast("OOP! Your cart is empty now!", {
                  icon: "👏",
                  duration: 2000,
                });
              } else {
                navigate("/cart/detail");
              }
            }}
            className="cursor-pointer flex items-center gap-2 relative"
          >
            {userSelector &&
              userSelector.userInfo.cart.cartItems.length !== 0 && (
                <div
                  className={`rounded-full w-3 h-3 absolute top-0 right-0 bg-red-500 flex justify-center items-center`}
                >
                  <p className="text-white text-[0.6rem] text-center">
                    {userSelector.userInfo.cart.cartItems.length}
                  </p>
                </div>
              )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p className="text-white text-xl sm:hidden">Cart</p>
          </div>
        )}

        {/* PROFILE */}
        {userSelector ? (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              if (toggleSelector !== "profileModal") {
                dispatch(setToggle("profileModal"));
              } else {
                dispatch(resetToggle());
              }
            }}
          >
            <p className="text-white text-[0.8rem]">{userSelector.fullName}</p>
            <div className="rounded-full overflow-hidden w-6 h-6">
              <img
                src={userSelector.userInfo.avatar}
                alt="user-avatar"
                className="w-full h-full"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="cursor-pointer flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <p className="text-white text-xl sm:hidden">Log in</p>
          </Link>
        )}
      </div>
      {toggleSelector === "profileModal" && <ProfileModal />}
      {toggleSelector === "favorite" && <FavoriteModal />}
    </div>
  );
}

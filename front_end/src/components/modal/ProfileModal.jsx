import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SHOP_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import { Link, useNavigate } from "react-router-dom";
import { resetToggle } from "../../redux/reducers/ToggleSlice";
import { handle_log_out } from "../../thunk/AuthThunk";
import { handleAnimateToggle } from "../../utils/Utils";

export default function ProfileModal() {
  const currentUserAuth = useSelector(USER_STATE_SELECTOR);
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    handleAnimateToggle(setActive);
  }, []);

  return (
    <div
      className={`${
        isActive
          ? "w-screen h-screen right-0 sm:w-[40vw] md:w-[25vw] sm:h-[30vh] "
          : "w-0 h-0"
      }   bg-white fixed top-[8%] sm:right-[3%] z-10 overflow-hidden flex justify-center items-center rounded-md shadow-xl duration-200 transition-all`}
    >
      <div className="w-[90%] h-[90%] flex flex-col items-center gap-3">
        <Link
          to={"/profile"}
          className="w-full border-[1px] border-solid border-slate-200 rounded-lg flex gap-2 items-center cursor-pointer hover:scale-95 transition-all duration-200 shadow-md px-2"
          onClick={() => dispatch(resetToggle())}
        >
          <div className=" w-8 h-8 rounded-full overflow-hidden">
            <img
              src={currentUserAuth ? currentUserAuth.userInfo.avatar : ""}
              alt="user-avatar"
              className="w-full h-full"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Mai Anh Khoa</p>
            <div className="flex items-center">
              <p className="text-[0.8rem] text-slate-400">
                Go to your profile{" "}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </Link>

        {/* SHOP CHANNEL TAB */}
        <Link
          to={shopSelector ? "/seller/dashboard" : "/seller/introduce"}
          className="flex items-center w-full justify-between border-t-[1px] border-solid border-slate-300 py-2 cursor-pointer hover:px-2 transition-all duration-200"
          onClick={() => dispatch(resetToggle())}
        >
          <div className="flex gap-1 items-center">
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
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
            <p>Shop channel</p>
          </div>

          <div>
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </Link>

        {/* LOGOUT TAB */}
        <div
          className="flex items-center w-full justify-between border-t-[1px] border-solid border-slate-300 py-2 cursor-pointer hover:px-2 transition-all duration-200"
          onClick={() => {
            dispatch(handle_log_out()).then((res) => {
              if (res) {
                navigate("/login");
              }
            });
          }}
        >
          <div className="flex gap-1 items-center">
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>

            <p>Log out</p>
          </div>

          <div>
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

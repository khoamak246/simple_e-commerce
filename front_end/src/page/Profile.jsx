import React, { useState } from "react";
import Personal from "../components/profile_page_items/Personal";
import Password from "../components/profile_page_items/Password";
import Address from "../components/profile_page_items/Address";
import Order from "../components/profile_page_items/Order";
import { useDispatch, useSelector } from "react-redux";
import { USER_STATE_SELECTOR } from "../redux/selectors/Selectors";
import { toast } from "react-hot-toast";
import { firebase_single_upload } from "../firebase/FirebaseService";
import { patch_update_user } from "../thunk/UserThunk";

export default function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("personal");
  const currentUserAuth = useSelector(USER_STATE_SELECTOR);
  const [prewviewAvatar, setPreviewAvatar] = useState();

  const handleOnClickActiveTab = (e) => {
    setActiveTab(e.target.getAttribute("name"));
  };

  const handlePreviewImg = (e) => {
    if (prewviewAvatar) {
      URL.revokeObjectURL(prewviewAvatar.previewUrl);
    }
    if (e.target.files) {
      let file = e.target.files[0];
      if (!file.type.includes("image")) {
        toast.error("OOP! You need to select an image!");
      } else {
        setPreviewAvatar({
          previewUrl: URL.createObjectURL(file),
          file,
        });
      }
    }
  };

  const handleOnSubmit = async () => {
    if (prewviewAvatar) {
      await firebase_single_upload(prewviewAvatar.file).then((res) => {
        let avatar = res.split("_assetType:")[0];
        dispatch(patch_update_user({ avatar })).then((res) => {
          if (res) {
            URL.revokeObjectURL(prewviewAvatar.previewUrl);
            setPreviewAvatar();
            toast.success("Update successfully!");
          }
        });
      });
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full h-full mt-10 lg:mt-0 lg:w-[70%] lg:h-[80%] bg-white flex">
        <div className="w-1/3 h-full bg-[#E6C191] flex flex-col items-center justify-between py-2">
          <div className="w-full flex flex-col items-center py-5 gap-2">
            <div className="w-28 h-28 lg:w-40 lg:h-40 rounded-full overflow-hidden flex justify-center items-center relative ">
              <input
                type="file"
                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                onChange={handlePreviewImg}
              />
              <img
                src={
                  prewviewAvatar
                    ? prewviewAvatar.previewUrl
                    : currentUserAuth
                    ? currentUserAuth.userInfo.avatar
                    : ""
                }
                alt="user-avatar"
                className="w-full h-full"
              />
            </div>
            <div className="text-white text-xl font-semibold">Anh Khoa</div>
            <button
              className={`${
                !prewviewAvatar && "hidden"
              } bg-[#F3A847] hover:bg-[#d99f53] px-5 py-1 font-semibold text-white rounded-2xl`}
              onClick={handleOnSubmit}
            >
              Save
            </button>
          </div>
          <div className="w-full">
            {/* PERSONAL */}
            <div
              name="personal"
              className="flex w-full items-center justify-between px-5 py-2 hover:px-8 hover:border-[1px] hover:border-solid hover:border-white duration-200 transition-all cursor-pointer"
              onClick={handleOnClickActiveTab}
            >
              <div className="flex gap-2" name="personal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                  name="personal"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p
                  className="hidden sm:block text-lg text-white font-semibold"
                  name="personal"
                >
                  Personal
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                name="personal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            {/* PASSWORD */}
            <div
              name="password"
              className="flex w-full items-center justify-between px-5 py-2 hover:px-8 hover:border-[1px] hover:border-solid hover:border-white duration-200 transition-all cursor-pointer"
              onClick={handleOnClickActiveTab}
            >
              <div className="flex gap-2" name="password">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                  name="password"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p
                  className="hidden sm:block text-lg text-white font-semibold"
                  name="password"
                >
                  Password
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                name="password"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            {/* ADDRESS */}
            <div
              name="address"
              className="flex w-full items-center justify-between px-5 py-2 hover:px-8 hover:border-[1px] hover:border-solid hover:border-white duration-200 transition-all cursor-pointer"
              onClick={handleOnClickActiveTab}
            >
              <div className="flex gap-2" name="address">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                  name="address"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                <p
                  className="hidden sm:block text-lg text-white font-semibold"
                  name="address"
                >
                  Address
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                name="address"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            {/* ORDER */}
            <div
              name="order"
              className="flex w-full items-center justify-between px-5 py-2 hover:px-8 hover:border-[1px] hover:border-solid hover:border-white duration-200 transition-all cursor-pointer"
              onClick={handleOnClickActiveTab}
            >
              <div className="flex gap-2" name="order">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                  name="order"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
                <p
                  className="hidden sm:block text-lg text-white font-semibold"
                  name="order"
                >
                  Order
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                name="order"
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
        <div className="w-2/3 h-full flex justify-start items-center pl-4">
          {activeTab === "personal" && <Personal />}
          {activeTab === "password" && <Password />}
          {activeTab === "address" && <Address />}
          {activeTab === "order" && <Order />}
        </div>
      </div>
    </div>
  );
}

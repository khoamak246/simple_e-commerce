import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";
import { resetToggle, setToggle } from "../../../redux/reducers/ToggleSlice";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  firebase_multiple_upload,
  firebase_single_upload,
} from "../../../firebase/FirebaseService";
import { patch_update_shop_profile } from "../../../thunk/ShopThunk";
import { toast } from "react-hot-toast";

export default function DshShopProfile() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const dispatch = useDispatch();
  const [shopProfile, setShopProfile] = useState({
    name: null,
    introduce: null,
    description: null,
  });
  const [previewImg, setPreviewImg] = useState({
    avatar: "",
    avatarFile: null,
    coverImg: "",
    coverImgFile: null,
  });

  const handleResetAll = () => {
    setPreviewImg({
      avatar: "",
      avatarFile: null,
      coverImg: "",
      coverImgFile: null,
    });
  };

  useEffect(() => {
    if (shopSelector) {
      setShopProfile({
        ...shopProfile,
        name: shopSelector.name,
        description: shopSelector.description,
      });
    }
  }, [shopSelector]);

  const handleOnChangeProfile = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (shopProfile) {
      if (name !== "introduce") {
        setShopProfile({ ...shopProfile, [name]: value });
      } else {
        console.log("in --> " + e.target.files);
        setShopProfile({ ...shopProfile, [name]: [...e.target.files] });
      }
    }
  };

  const onPreviewImg = (e) => {
    const { name, files } = e.target;
    if (previewImg[name] !== "") {
      URL.revokeObjectURL(previewImg[name]);
    }

    let previewURl = URL.createObjectURL(files[0]);
    if (name === "avatar") {
      setPreviewImg({
        ...previewImg,
        [name]: previewURl,
        avatarFile: files[0],
      });
    } else {
      setPreviewImg({
        ...previewImg,
        [name]: previewURl,
        coverImgFile: files[0],
      });
    }
  };

  const handleOnSubmit = async () => {
    dispatch(setToggle("loading"));
    let avatar = null;
    let coverImg = null;
    let introduce = [];
    if (previewImg.avatarFile) {
      avatar = await firebase_single_upload(previewImg.avatarFile);
    }

    if (previewImg.coverImg) {
      coverImg = await firebase_single_upload(previewImg.coverImgFile);
    }

    if (shopProfile.introduce !== null && shopProfile.introduce.length !== 0) {
      let tempUrlArr = await firebase_multiple_upload(shopProfile.introduce);
      for (let i = 0; i < tempUrlArr.length; i++) {
        const element = tempUrlArr[i];
        introduce.push({
          url: element.split("_assetType:")[0],
          assetType: "image",
        });
      }
    }

    const { name, description } = shopProfile;
    let udpateShopForm = { name, introduce, description, avatar, coverImg };
    dispatch(patch_update_shop_profile(udpateShopForm)).then((res) => {
      if (res) {
        dispatch(resetToggle());
        toast.success("Update successfully!");
      }
    });
    handleResetAll();
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
          Shop profile:
        </h1>
      </div>
      <div className="pl-2 h-[95%] w-full grid grid-cols-1 md:grid-cols-2 gap-2 overflow-auto">
        {/* AVATAR */}
        <div className="w-full grid-cols-1">
          {/* CHANGE IMG */}
          <div className="w-full h-72 relative">
            <img
              src={
                previewImg.coverImg !== ""
                  ? previewImg.coverImg
                  : shopSelector
                  ? shopSelector.coverImg
                  : ""
              }
              alt=""
              className="w-full h-full"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full flex items-center gap-3 px-5">
              <div className="w-20 h-20 rounded-full cursor-pointer overflow-hidden relative group">
                {/* AVATAR IMG CHANGE */}
                <input
                  name="avatar"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={onPreviewImg}
                  accept="image/*"
                />
                <div className="absolute top-0 left-0 w-full group-hover:h-full h-0 duration-300 transition-all flex justify-center items-center bg-black bg-opacity-20 overflow-hidden">
                  <h2 className="text-sm text-center text-white">
                    Change Avatar
                  </h2>
                </div>
                <img
                  src={
                    previewImg.avatar !== ""
                      ? previewImg.avatar
                      : shopSelector
                      ? shopSelector.avatar
                      : ""
                  }
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full gap-2">
                <h2 className="text-white text-xl w-full">
                  {shopSelector ? shopSelector.name : ""}
                </h2>
                <div className="w-full flex flex-col sm:flex-row gap-2">
                  <button className="w-ful md:w-[50%] text-white flex justify-center items-center border-white border-[1px] border-solid gap-2">
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <p>Follow</p>
                  </button>
                  <button className="w-ful md:w-[50%] text-white flex justify-center items-center border-white border-[1px] border-solid gap-2">
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
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <p>Chat</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute top-[2%] right-[2%] flex gap-2 bg-white bg-opacity-20 backdrop-blur-md rounded-md px-2 py-1 cursor-pointer">
              {/* COVER IMG CHANGE */}
              <input
                name="coverImg"
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
                onChange={onPreviewImg}
                accept="image/*"
              />
              <p className="text-white">Change cover image</p>
              <div className="cursor-pointer">
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
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* SEE SHOP */}
          <Link
            to={`/shop/detail/${shopSelector.id}`}
            className="w-full flex justify-between cursor-pointer border-solid border-[1px] items-center py-2 px-5 duration-200 transition-all hover:bg-slate-200"
          >
            <p className="text-sm text-slate-400">See shop with role user</p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
            </div>
          </Link>
          {/* SEE PRODUCT  */}
          <Link
            to={"/seller/dashboard/productMng/allProduct"}
            className="w-full flex justify-between cursor-pointer border-solid border-[1px] items-center py-2 px-5 duration-200 transition-all hover:bg-slate-200"
          >
            <p className="text-sm text-slate-400">Product</p>
            <div className="flex gap-1 items-center">
              <p className="text-sm text-[#F04D2D]">
                {shopSelector ? shopSelector.products.length : 0}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
          </Link>
          {/* ADDRESS */}
          <Link
            to={"/seller/dashboard/shopMng/shopAddress"}
            className="w-full flex justify-between cursor-pointer border-solid border-[1px] items-center py-2 px-5 duration-200 transition-all hover:bg-slate-200"
          >
            <p className="text-sm text-slate-400">
              {shopSelector
                ? `${shopSelector.streetDetail} - ${shopSelector.ward.name} - ${shopSelector.district.name} - ${shopSelector.provinceCity.name}`
                : ""}
            </p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-red-400"
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
            </div>
          </Link>
        </div>

        {/* INFO */}
        <div className="w-full flex flex-col gap-10">
          {/* SHOP NAME */}
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center gap-1">
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <h2 className="font-semibold">Shop name:</h2>
            </div>
            <input
              name="name"
              type="text"
              placeholder="Shop name..."
              className="w-[80%] border-solid border-[1px] border-slate-500 rounded-sm px-2 py-1 text-sm"
              value={shopProfile.name ? shopProfile.name : ""}
              onChange={handleOnChangeProfile}
            />
          </div>
          {/* CHOOSE INTRODUCE */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-1 items-start">
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <div>
                <h2 className="font-semibold">Shop introduce image:</h2>
                <p className="text-sm text-slate-400">
                  This image list will display in your shop detail page
                </p>
              </div>
            </div>
            <div className="w-[86%] pl-6">
              <div className="border-[1px] border-dashed border-slate-400 w-20 h-20 cursor-pointer hover:bg-[#FDF3F1] flex flex-col justify-center items-center rounded-md relative">
                <input
                  name="introduce"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  multiple={true}
                  accept="image/*"
                  onChange={handleOnChangeProfile}
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

                <p className="text-sm text-[#EE4D2D]">{`Image ${
                  shopProfile.introduce && shopProfile.introduce.length !== 0
                    ? shopProfile.introduce.length
                    : shopSelector
                    ? shopSelector.introduce.length
                    : 0
                }/5`}</p>
              </div>
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-1 items-start">
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <h2 className="font-semibold">Description:</h2>
            </div>
            <div className="w-full">
              <textarea
                name="description"
                id=""
                cols="30"
                rows="5"
                className="w-[80%] resize-none text-sm outline-none p-2 border-[1px] border-solid border-slate-400  rounded-md"
                placeholder="Product description..."
                maxLength={255}
                value={shopProfile.description ? shopProfile.description : ""}
                onChange={handleOnChangeProfile}
              ></textarea>
            </div>
          </div>
          {/* BUTTON SUBMIT */}
          <div className="w-full flex gap-2 mb-2">
            <button
              className="bg-orange-400 py-1 px-10 rounded-lg text-white"
              onClick={handleOnSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

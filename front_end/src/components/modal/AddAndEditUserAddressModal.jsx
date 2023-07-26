import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../redux/reducers/ToggleSlice";
import {
  handleRenderCurrentSelectAddress,
  handleTakeIdFromSelectAddress,
} from "../../utils/Utils";
import {
  ADDRESS_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import AddressItem from "../profile_page_items/AddressItem";
import { toast } from "react-hot-toast";
import {
  patch_update_user_address,
  post_create_new_user_address,
} from "../../thunk/AddressThunk";

export default function AddAndEditUserAddressModal({
  editItem,
  setOpenModal,
  setSelectAddress,
  selectAddress,
  setSelectEditAddress,
}) {
  const [isActive, setIsActive] = useState(false);
  const [formState, setFormState] = useState("create");
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const [streetDetail, setStreetDetail] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 50);
  }, []);

  useEffect(() => {
    if (userSelector && addressSelector && !editItem) {
      if (userSelector.userInfo.userAddresses.length === 0) {
        setFormState("create");
      } else {
        setFormState("selectAdress");
      }
    } else if (editItem) {
      setFormState("edit");
      setStreetDetail(editItem.streetDetail);
    }
  }, [addressSelector, userSelector]);

  const handleOnBackButton = () => {
    if (formState == "edit") {
    }
  };

  const handleSubmit = () => {
    if (formState === "create") {
      handleCreateUserAddress();
    } else if (formState === "edit") {
      handleEditUserAddress();
    }
  };

  const handleCreateUserAddress = () => {
    if (streetDetail.length === 0) {
      return toast.error("OOP! Please check your street detail again!");
    }

    let addressSelectedId = handleTakeIdFromSelectAddress(addressSelector);
    let createUserAddressForm = {
      ...addressSelectedId,
      streetDetail,
    };

    dispatch(post_create_new_user_address(createUserAddressForm)).then(
      (res) => {
        if (res) {
          toast.success("Create address successfully!");
          setFormState("selectAdress");
        }
      }
    );
  };

  const handleEditUserAddress = () => {
    if (streetDetail.length === 0) {
      return toast.error("OOP! Please check your street detail again!");
    }
    let addressSelectedId = handleTakeIdFromSelectAddress(addressSelector);
    let data = {
      ...addressSelectedId,
      streetDetail,
    };
    dispatch(
      patch_update_user_address({ userAddressId: editItem.id, data })
    ).then((res) => {
      if (res) {
        toast.success("Edit successfully!");
        setSelectEditAddress();
        handleOnCloseModal();
      }
    });
  };

  const handleOnCloseModal = () => {
    setIsActive(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 400);
  };

  const handleRenderAddOrEditAddress = () => {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <img
          src="https://cdn.dribbble.com/users/771832/screenshots/2691247/map.png"
          alt=""
          className="w-[50%]"
          draggable={false}
        />
        <div
          className={`flex flex-col justify-center items-center w-full gap-2`}
        >
          <div
            className="flex gap-2 items-center justify-center cursor-pointer"
            onClick={() => dispatch(setToggle("selectAddress"))}
          >
            <p>{handleRenderCurrentSelectAddress(addressSelector)}</p>
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
          <input
            name="streetDetail"
            type="text"
            maxLength={255}
            placeholder="Street detail..."
            className="py-1 px-2 border-slate-400 border-solid border-[1px] rounded-sm text-sm w-[50%]"
            value={streetDetail}
            onChange={(e) => setStreetDetail(e.target.value)}
          />
        </div>
        <button
          className="bg-orange-300 w-[25%] rounded-md py-1 px-3 font-semibold text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    );
  };

  const handleRenderAddressList = () => {
    if (userSelector) {
      return (
        <div className="w-[80%] h-[90%] flex flex-col gap-3">
          <div className="w-full h-[5%]">
            <h1 className="text-lg">Select Address:</h1>
          </div>
          <div className="w-full h-[90%] overflow-auto flex flex-col gap-3 shadow-lg">
            {userSelector.userInfo.userAddresses.map((val, index) => {
              return (
                <AddressItem
                  key={val.id}
                  address={val}
                  selectAddress={selectAddress}
                  setSelectAddress={setSelectAddress}
                />
              );
            })}
          </div>
          <div className="w-full h-[5%] flex justify-center items-center">
            <button
              className="button-theme flex px-2 py-1"
              onClick={() => setFormState("create")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Create new address
            </button>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div
      className={`${
        isActive ? "w-screen h-screen" : "w-0 h-0"
      } bg-black bg-opacity-50  fixed top-0 left-0 flex items-center justify-center overflow-hidden duration-300 transition-all`}
    >
      <div className="w-[50%] h-[80%] bg-white flex flex-col items-center justify-center relative rounded-md">
        <div
          className="absolute top-[5%] right-[5%] cursor-pointer"
          onClick={handleOnCloseModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute top-[5%] left-[5%] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {(formState === "create" || formState == "edit") &&
          handleRenderAddOrEditAddress()}
        {(formState === "selectAdress" || formState == "selectEditItem") &&
          handleRenderAddressList()}
      </div>
    </div>
  );
}

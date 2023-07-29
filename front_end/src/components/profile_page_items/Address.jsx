import React, { useEffect, useState } from "react";
import AddressItem from "./AddressItem";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDRESS_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import AddAndEditUserAddressModal from "../modal/AddAndEditUserAddressModal";
import { handleTakeIndexFromUserAddress } from "../../utils/Utils";
import { setNewAddressState } from "../../redux/reducers/AddressSlice";

export default function Address() {
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const dispatch = useDispatch();
  const [isToggleCreateAndEditAddressModal, setToggleCreateAndEditModal] =
    useState(false);
  const [selectEditAddress, setSelectEditAddress] = useState();
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);
  return (
    <div
      className={`${
        isActive ? "w-[95%]" : "w-0"
      } h-[95%] flex flex-col gap-5 overflow-auto duration-200 transition-all`}
    >
      {userSelector &&
        userSelector.userInfo.userAddresses.map((val, index) => {
          return (
            <div
              className="cursor-pointer"
              key={val.id}
              onClick={() => {
                if (userSelector && addressSelector) {
                  let selectAddress = handleTakeIndexFromUserAddress(
                    val,
                    addressSelector
                  );
                  dispatch(
                    setNewAddressState({ ...addressSelector, selectAddress })
                  );
                  setSelectEditAddress(val);
                  setToggleCreateAndEditModal(true);
                }
              }}
            >
              <AddressItem address={val} />
            </div>
          );
        })}
      <button className="button-theme w-[28%] flex gap-1 justify-center items-center py-2">
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
            d="M12 6v12m6-6H6"
          />
        </svg>
        New address
      </button>
      {selectEditAddress && (
        <AddAndEditUserAddressModal
          editItem={selectEditAddress}
          closeModal={() => {
            setSelectEditAddress();
            setToggleCreateAndEditModal(false);
          }}
          setSelectEditAddress={setSelectEditAddress}
        />
      )}
    </div>
  );
}

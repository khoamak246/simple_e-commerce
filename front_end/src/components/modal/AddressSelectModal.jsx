import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDRESS_STATE_SELECTOR,
  TOGGLE_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import { toast } from "react-hot-toast";
import { resetToggle, setToggle } from "../../redux/reducers/ToggleSlice";
import { setNewAddressState } from "../../redux/reducers/AddressSlice";
import {
  handleAnimateToggle,
  handleCloseAnimateToggle,
} from "../../utils/Utils";

export default function AddressSelectModal() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const toggleSelector = useSelector(TOGGLE_STATE_SELECTOR);
  const [selectAddress, setSelectAddress] = useState({
    provinceCity: null,
    district: null,
    ward: null,
  });
  const handleRenderOptionAddress = (option) => {
    if (addressSelector) {
      const { address } = addressSelector;
      let mapItem = [];
      if (option === "provinceCity") {
        mapItem = address;
      } else {
        if (selectAddress.provinceCity !== null) {
          let districtArr = address[selectAddress.provinceCity].district;
          if (option === "district") {
            mapItem = districtArr;
          } else {
            if (selectAddress.district !== null) {
              mapItem = districtArr[selectAddress.district].ward;
            }
          }
        }
      }

      return mapItem.map((val, index) => {
        return (
          <option value={index} key={val.id}>
            {val.name}
          </option>
        );
      });
    } else {
      return [];
    }
  };

  const handleOnchangeInputSelectAddress = (e) => {
    const { id, value } = e.target;
    if (id === "provinceCity") {
      setSelectAddress({
        provinceCity: Number(value),
        district: null,
        ward: null,
      });
    } else {
      setSelectAddress({ ...selectAddress, [id]: Number(value) });
    }
  };

  const handleConfirmAddress = () => {
    for (const key in selectAddress) {
      if (selectAddress[key] == null) {
        toast.error("You must select address to continue!", {
          style: { zIndex: 500 },
        });
        return;
      }
    }

    if (toggleSelector === "selectAddress") {
      dispatch(
        setNewAddressState({
          address: addressSelector.address,
          selectAddress,
        })
      );
      toast.success("Select address successfully!");
      setTimeout(() => {
        dispatch(resetToggle());
      }, 500);
    }
  };

  useEffect(() => {
    handleAnimateToggle(setIsActive);
  }, []);

  const closeModal = () => {
    dispatch(setToggle(null));
  };

  return (
    <div
      className={`${
        isActive ? "w-screen h-screen" : "w-0 h-0"
      } bg-black bg-opacity-50  fixed top-0 left-0 flex items-center justify-center z-[300] overflow-hidden duration-300 transition-all`}
    >
      <div className="w-[50%] h-[80%] bg-[#F8F8F8] flex flex-col items-center justify-center relative">
        <div
          className="absolute top-[-2.5%] right-[-2%] cursor-pointer"
          onClick={() => {
            handleCloseAnimateToggle(setIsActive, closeModal);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 fill-white text-black"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
              stroke="gray"
            />
          </svg>
        </div>
        <div className="w-[80%] h-[85%] bg-white flex flex-col items-center">
          <h1 className="text-2xl">Address</h1>
          <div className="w-[90%] flex flex-col gap-3 items-center">
            {/* Province City */}
            <div className="w-full">
              <label
                htmlFor="provinceCity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Province/City
              </label>
              <select
                id="provinceCity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleOnchangeInputSelectAddress}
              >
                <option value={null}>Choose a country</option>
                {handleRenderOptionAddress("provinceCity")}
              </select>
            </div>

            {/* District */}
            <div className="w-full">
              <label
                htmlFor="district"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                District
              </label>
              <select
                id="district"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={selectAddress.provinceCity == null}
                onChange={handleOnchangeInputSelectAddress}
              >
                <option value={null}>Choose a country</option>
                {handleRenderOptionAddress("district")}
              </select>
            </div>

            {/* Ward */}
            <div className="w-full">
              <label
                htmlFor="ward"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                District
              </label>
              <select
                id="ward"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={selectAddress.district == null}
                onChange={handleOnchangeInputSelectAddress}
              >
                <option value={null}>Choose a country</option>
                {handleRenderOptionAddress("ward")}
              </select>
            </div>
            <button
              className="bg-[#FF424E] py-1 px-6 text-white rounded-md"
              onClick={handleConfirmAddress}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

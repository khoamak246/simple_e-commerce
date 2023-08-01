import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../../redux/reducers/ToggleSlice";
import {
  ADDRESS_STATE_SELECTOR,
  SHOP_STATE_SELECTOR,
} from "../../../redux/selectors/Selectors";
import {
  handleRenderCurrentSelectAddress,
  handleTakeIdFromSelectAddress,
} from "../../../utils/Utils";
import { useState } from "react";
import { useEffect } from "react";
import {
  setAddress,
  setNewAddressState,
} from "../../../redux/reducers/AddressSlice";
import { patch_update_shop_profile } from "../../../thunk/ShopThunk";
import { toast } from "react-hot-toast";

export default function DshShopAddress() {
  const dispatch = useDispatch();
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const [inputStreetDetail, setInputStreetDetail] = useState("");
  useEffect(() => {
    if (shopSelector && addressSelector) {
      setInputStreetDetail(shopSelector.streetDetail);
      const { address } = addressSelector;
      let provinceCity = address
        .map((e) => e.id)
        .indexOf(shopSelector.provinceCity.id);

      let district = address[provinceCity].district
        .map((e) => e.id)
        .indexOf(shopSelector.district.id);

      let ward = address[provinceCity].district[district].ward
        .map((e) => e.id)
        .indexOf(shopSelector.ward.id);

      dispatch(
        setNewAddressState({
          address,
          selectAddress: { provinceCity, district, ward },
        })
      );
    }
  }, [shopSelector]);

  const handleOnSubmit = () => {
    if (inputStreetDetail.trim().length == 0) {
      return toast.error("OOP! You forgot enter street detail!");
    }
    let updateShopForm = handleTakeIdFromSelectAddress(addressSelector);
    dispatch(patch_update_shop_profile(updateShopForm)).then((res) => {
      if (res) {
        toast.success("Update successfully!");
        setInputStreetDetail("");
        setInputStreetDetail(shopSelector.streetDetail);
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
          Shop address:
        </h1>
      </div>
      <div className="w-full h-[95%] flex flex-col gap-5 justify-center items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/Shop_ill_3-removebg.png?alt=media&token=8726f947-983c-4d17-bcfd-c9d0bc03422f"
          className="w-[25%]"
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
            type="text"
            maxLength={255}
            placeholder="Street detail..."
            className="py-1 px-2 border-slate-400 border-solid border-[1px] rounded-sm text-sm w-[50%]"
            onChange={(e) => {
              setInputStreetDetail(e.target.value);
            }}
            value={inputStreetDetail}
          />
        </div>
        <button
          className="bg-orange-300 w-[25%] rounded-md py-1 px-3 font-semibold text-white"
          onClick={handleOnSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

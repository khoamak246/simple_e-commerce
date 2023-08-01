import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerContent } from "../../assets/js/SellerRegisterFormContent";
import {
  ERROR_SHOP_NAME_MESS,
  SHOP_NAME_REGEX,
  validationRegex,
} from "../../utils/Validatation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ADDRESS_STATE_SELECTOR } from "../../redux/selectors/Selectors";
import { setToggle } from "../../redux/reducers/ToggleSlice";
import { post_save_new_shop } from "../../thunk/ShopThunk";
import { handleRenderCurrentSelectAddress } from "../../utils/Utils";

export default function SellerRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerStage, setRegiterStage] = useState(0);
  const [inputRegisterForm, setInputRegisterForm] = useState({
    isAgreedPolicy: false,
    shopName: "",
    isValidShopName: null,
    streetDetail: "",
  });
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const handleOnClickNext = () => {
    if (registerStage == 0) {
      if (!inputRegisterForm.isAgreedPolicy) {
        toast.error("OOP! You need to agree with policy to continue");
      } else {
        setRegiterStage((prev) => prev + 1);
      }
    } else if (registerStage == 1) {
      if (!inputRegisterForm.isValidShopName) {
        toast.error("OOP! Your shop name not correct!");
      } else {
        setRegiterStage((prev) => prev + 1);
      }
    } else if (registerStage == 2) {
      if (inputRegisterForm.streetDetail.length == 0) {
        toast.error("OOP! You forgot enter street detail!");
      } else {
        setRegiterStage((prev) => prev + 1);
      }
    } else {
      console.log("in");
      const { shopName, streetDetail } = inputRegisterForm;
      dispatch(post_save_new_shop({ shopName, streetDetail })).then((res) => {
        if (res) {
          toast.success("Create shop successfully!");
          navigate("/seller/dashboard");
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full sm:w-[80%] sm:h-[80%] bg-white flex flex-col justify-center items-center gap-3 relative">
        <div className="hidden md:block absolute top-[50%] left-[-10%] w-[30%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 rotate-90">
          <div
            className="bg-orange-300 h-2.5 rounded-full"
            style={{ width: `${registerContent[registerStage].process}%` }}
          ></div>
        </div>
        <img
          src={registerContent[registerStage].imgUrl}
          className="w-[25%]"
          draggable={false}
        />
        <h1 className="text-2xl text-red-400 font-semibold font-serif text-center">
          {registerContent[registerStage].title}
        </h1>
        <h2 className="font-serif text-lg text-center">
          {registerContent[registerStage].subTitle}{" "}
          <a
            href="#"
            className={`${
              registerStage !== 0 && "hidden"
            } text-blue-600 cursor-pointer`}
          >
            policies
          </a>{" "}
          <span className={`${registerStage !== 0 && "hidden"}`}>in here!</span>
        </h2>

        {/* STAGE POLICY */}
        <div
          className={`${
            registerStage !== 0 && "hidden"
          } flex gap-1 items-center`}
        >
          <input
            type="checkbox"
            onChange={() => {
              setInputRegisterForm({
                ...inputRegisterForm,
                isAgreedPolicy: !inputRegisterForm.isAgreedPolicy,
              });
            }}
            checked={inputRegisterForm.isAgreedPolicy}
          />
          <p>I agree with the policy</p>
        </div>

        {/* STAGE NAME */}
        <div
          className={`${
            registerStage !== 1 && "hidden"
          } flex flex-col justify-center items-center gap-1`}
        >
          <input
            type="text"
            placeholder="Your shop name here..."
            className="py-1 px-2 border-slate-400 border-solid border-[1px] rounded-sm text-sm"
            maxLength={50}
            onChange={(e) => {
              setInputRegisterForm({
                ...inputRegisterForm,
                shopName: e.target.value,
                isValidShopName: validationRegex(
                  SHOP_NAME_REGEX,
                  e.target.value
                ),
              });
            }}
            value={inputRegisterForm.shopName}
          />
          <p
            className={`${registerStage !== 1 && "hidden"} ${
              (inputRegisterForm.isValidShopName === null ||
                inputRegisterForm.isValidShopName === true) &&
              "hidden"
            } text-[0.8rem] text-red-500`}
          >
            {ERROR_SHOP_NAME_MESS}
          </p>
        </div>

        {/* STAGE ADDRESS */}
        <div
          className={`${
            registerStage !== 2 && "hidden"
          } flex flex-col justify-center items-center w-full gap-2`}
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
              setInputRegisterForm({
                ...inputRegisterForm,
                streetDetail: e.target.value,
              });
            }}
            value={inputRegisterForm.streetDetail}
          />
        </div>

        {/*ROUTER BUTTON */}
        <div className="flex gap-2">
          <button
            className={`${
              registerStage == 0 && "hidden"
            } bg-slate-400 rounded-full py-1 px-3 font-semibold text-white`}
            onClick={() => {
              setRegiterStage((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <button
            className={`${
              registerStage !== 3 ? "bg-orange-300" : "bg-green-300"
            } rounded-full py-1 px-3 font-semibold text-white`}
            onClick={handleOnClickNext}
          >
            {registerContent[registerStage].button}
          </button>
        </div>
      </div>
    </div>
  );
}

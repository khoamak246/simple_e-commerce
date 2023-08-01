import React, { useEffect, useState } from "react";
import DshBusinessItems from "../seller_page_items/DashboardItems/DshBusinessItems";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  BUSINESS_LIST_SELECTOR,
  BUSINESS_SELECTED_SELECTOR,
} from "../../redux/selectors/Selectors";
import {
  resetSelectBusiness,
  setBusinessIndex,
  setChildrenBusinessIndex,
  setSubinessIndex,
} from "../../redux/reducers/BusinessSlice";
import {
  handleAnimateToggle,
  handleCloseAnimateToggle,
} from "../../utils/Utils";

export default function SelectBusinessModal({
  closeModal,
  selectBusinessMethod,
}) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const businessSelector = useSelector(BUSINESS_LIST_SELECTOR);
  const selectBusiness = useSelector(BUSINESS_SELECTED_SELECTOR);

  useEffect(() => {
    handleAnimateToggle(setIsActive);
  }, []);

  const handleOnCloseModal = () => {
    handleCloseAnimateToggle(setIsActive, closeModal);
  };

  const handleRenderResultSelectBusiness = () => {
    let ressult = "";
    let { businessIndex, subBusinessIndex, childrenBusinessIndex } =
      selectBusiness;
    if (businessIndex !== null) {
      ressult += businessSelector[businessIndex].name;
    }

    if (subBusinessIndex !== null) {
      let business = businessSelector[businessIndex];
      let subBusiness = business.subBusiness[subBusinessIndex];
      ressult += ` > ${subBusiness.name}`;
    }

    if (childrenBusinessIndex !== null) {
      let bussiness = businessSelector[businessIndex];
      let subBusiness = bussiness.subBusiness[subBusinessIndex];
      let childrenBusiness = subBusiness.subBusiness[childrenBusinessIndex];
      ressult += ` > ${childrenBusiness.name}`;
    }

    return ressult;
  };

  const handleOnConfirmSelectBusiness = () => {
    let { businessIndex, subBusinessIndex, childrenBusinessIndex } =
      selectBusiness;
    if (businessIndex == null || subBusinessIndex == null) {
      return toast.error("OOP! You need to select business!");
    }

    let bussiness = businessSelector[businessIndex];
    let subBusiness = bussiness.subBusiness[subBusinessIndex];
    if (childrenBusinessIndex == null && subBusiness.subBusiness.length !== 0) {
      return toast.error("OOP! You need to select business!");
    }

    toast.success("Select business successfully!");
    handleOnCloseModal();
  };

  return (
    <div
      className={`${
        isActive ? "w-screen h-screen" : "w-0 h-0"
      } fixed top-0 left-0  bg-black bg-opacity-50 flex justify-center items-center overflow-hidden transition-all duration-300`}
    >
      <div className="w-[70%] h-[80%] bg-white rounded-md flex justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <h2 className="h-[5%] text-lg font-semibold">Select catalog:</h2>
            <div
              className="cursor-pointer text-slate-300"
              onClick={() => {
                dispatch(resetSelectBusiness());
                handleOnCloseModal();
              }}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="h-[80%] w-full bg-[#F6F6F6] overflow-auto grid grid-cols-3 p-4 rounded-md">
            <div className="bg-white w-full border-r-[1px] border-solid border-slate-200 py-2">
              {businessSelector?.map((val, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => dispatch(setBusinessIndex(index))}
                    className={`${
                      selectBusiness.businessIndex !== null &&
                      selectBusiness.businessIndex === index &&
                      "bg-slate-100"
                    }`}
                  >
                    <DshBusinessItems key={index} business={val} />
                  </div>
                );
              })}
            </div>
            <div className="bg-white w-full border-r-[1px] border-solid border-slate-200 py-2">
              {selectBusiness.businessIndex !== null &&
                businessSelector[selectBusiness.businessIndex].subBusiness?.map(
                  (val, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          dispatch(setSubinessIndex(index));
                          if (selectBusinessMethod) {
                            console.log("in");
                            selectBusinessMethod(val);
                          }
                        }}
                        className={`${
                          selectBusiness.subBusinessIndex !== null &&
                          selectBusiness.subBusinessIndex === index &&
                          "bg-slate-100"
                        }`}
                      >
                        <DshBusinessItems key={index} business={val} />
                      </div>
                    );
                  }
                )}
            </div>
            <div className="bg-white w-full py-2">
              {selectBusiness.subBusinessIndex !== null &&
                businessSelector[selectBusiness.businessIndex].subBusiness
                  .length !== 0 &&
                businessSelector[selectBusiness.businessIndex].subBusiness[
                  selectBusiness.subBusinessIndex
                ].subBusiness.map((val, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        dispatch(setChildrenBusinessIndex(index));

                        if (selectBusinessMethod) {
                          selectBusinessMethod(val);
                        }
                      }}
                      className={`${
                        selectBusiness.childrenBusinessIndex !== null &&
                        selectBusiness.childrenBusinessIndex === index &&
                        "bg-slate-100"
                      }`}
                    >
                      <DshBusinessItems key={index} business={val} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="h-[15%] w-full flex justify-between items-center">
            <div>
              <p>
                Selected:{" "}
                <span className="font-semibold">
                  {handleRenderResultSelectBusiness()}
                </span>
              </p>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <button
                className="border-[1px] border-solid border-slate-300 rounded-md py-1 px-2"
                onClick={() => {
                  dispatch(resetSelectBusiness());
                  handleOnCloseModal();
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#EE4D2D] py-1 px-2 rounded-md text-white"
                onClick={handleOnConfirmSelectBusiness}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

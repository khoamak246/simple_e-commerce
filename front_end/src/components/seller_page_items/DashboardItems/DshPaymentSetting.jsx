import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GET_FIND_ALL_PAYMENT_WAY } from "../../../api/service/PaymentWayService";
import { useDispatch, useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";
import { patch_update_shop_profile } from "../../../thunk/ShopThunk";
import { toast } from "react-hot-toast";

export default function DshPaymentSetting() {
  const [paymentWayArr, setPaymentWayArr] = useState([]);
  const dispatch = useDispatch();
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  useEffect(() => {
    async function fetchData() {
      await GET_FIND_ALL_PAYMENT_WAY().then((res) => {
        if (res.status === 200) {
          setPaymentWayArr(res.data.data);
        } else {
          console.log(res);
        }
      });
    }
    fetchData();
  }, []);

  const isExistPaymentWayInShop = (paymentWayId) => {
    if (shopSelector) {
      const { paymentWays } = shopSelector;
      let paymentIndex = paymentWays.find((e) => e.id == paymentWayId);
      if (paymentIndex) {
        return true;
      }
    }
    return false;
  };

  const handleAddOrRemovePaymentInShop = (paymentId) => {
    if (shopSelector) {
      let paymentWays = [];
      shopSelector.paymentWays.map((e) => paymentWays.push(e.id));
      if (!isExistPaymentWayInShop(paymentId)) {
        paymentWays.push(paymentId);
      } else {
        let paymentIndex = paymentWays.indexOf(paymentId);
        if (paymentIndex >= 0) {
          paymentWays.splice(paymentIndex, 1);
        }
      }
      dispatch(patch_update_shop_profile({ paymentWays })).then((res) => {
        if (res) {
          toast.success("Update payment successfully!");
        }
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
          Payment setting:
        </h1>
      </div>
      <div className="h-[95%] w-full flex justify-center">
        <div className="w-[90%] h-[50%] border-[1px] grid grid-cols-3 border-solid border-slate-200 shadow-lg">
          <div className="w-full border-solid border-r-slate-300 border-[1px]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fmoney-removebg.png?alt=media&token=c8ade493-4ae0-4b86-b261-4118883f3e50"
              alt=""
              className="w-full"
            />
          </div>
          <div className="col-span-2 w-full h-full flex flex-col items-center py-2 gap-5">
            <h1 className="text-xl h-[5%]">Option</h1>
            <div className="w-full h-[95%] flex items-center flex-col gap-2 overflow-auto">
              {paymentWayArr.map((val, index) => {
                return (
                  <div
                    className="w-[80%] border-solid border-red-500 border-[1px] rounded-md flex justify-between items-center px-3 py-2"
                    key={val.id}
                  >
                    <p>{val.name}</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleAddOrRemovePaymentInShop(val.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${
                          isExistPaymentWayInShop(val.id) &&
                          "fill-green-400 text-white"
                        } `}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import CollumnChar from "./dshSubItems/CollumnChar";
import SingleItemData from "./dshSubItems/SingleItemData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_shop_revenue_management } from "../../../thunk/ShopThunk";
import { useState } from "react";
import { SHOP_STATE_SELECTOR } from "./../../../redux/selectors/Selectors";
import RevenueTopTen from "./dshSubItems/RevenueTopTen";

export default function DshRevenue() {
  const dispatch = useDispatch();
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const [data, setData] = useState();
  useEffect(() => {
    if (shopSelector) {
      dispatch(get_shop_revenue_management(2023)).then((res) => {
        if (res) {
          setData(res);
        }
      });
    }
  }, [shopSelector]);

  return (
    <div className="w-full h-full flex flex-col gap-2 pb-2">
      <div className="h-[20%] w-full flex justify-center items-center">
        <h1 className="text-xl font-semibold">Revenue</h1>
      </div>
      <div className="h-[80%] w-full grid grid-cols-3">
        <div className="col-span-2 flex justify-center items-center ">
          <div className="w-[80%] h-[80%]">
            <CollumnChar
              data={data}
              title={"Revenue each month"}
              color={"#92d884"}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <div className="h-[20%] w-full flex items-center">
            <SingleItemData
              title={"Total revenue"}
              data={data ? `${data.totalRevenue}$` : ""}
              index={0}
            />
          </div>
          <div className="h-[80%] w-full flex flex-col border-slate-400 border-[1px] border-solid rounded">
            <div className="h-[10%] w-full grid grid-cols-3 border-slate-400 border-b-[1px] border-solid items-center">
              <div className="h-full col-span-1 pl-2 font-semibold border-slate-400 border-r-[1px] border-solid items-center flex">
                <p>Date</p>
              </div>
              <div
                className={`col-span-2 h-full flex items-center pl-2 font-semibold`}
              >
                <p>Revenue</p>
              </div>
            </div>
            {data &&
              data.top10Revenue.map((val, index) => {
                return <RevenueTopTen key={index} data={val} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

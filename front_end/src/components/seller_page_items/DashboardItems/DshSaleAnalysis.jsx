import React from "react";

import CollumnChar from "./dshSubItems/CollumnChar";
import SingleItemData from "./dshSubItems/SingleItemData";
import { useDispatch, useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "./../../../redux/selectors/Selectors";
import { useEffect } from "react";
import { get_shop_sale_management } from "../../../thunk/ShopThunk";
import { useState } from "react";

export default function DshSaleAnalysis() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (shopSelector) {
      dispatch(get_shop_sale_management()).then((res) => {
        if (res) {
          setData(res);
        }
      });
    }
  }, [shopSelector]);

  const handleRenderSingleItem = () => {
    if (data) {
      return [
        {
          title: "Product Number",
          subTitle: null,
          data: data.productNumber,
        },
        {
          title: "Follower number",
          subTitle: null,
          data: data.followerNumber,
        },
        {
          title: "Highest cancellation rate product",
          subTitle: data.maxCancelOrderPercentProduct.name,
          data: `${data.maxCancelOrderPercentProduct.data}%`,
        },
        {
          title: "Highest return/refund rate product",
          subTitle:
            data.maxReturnOrderPercentProduct.data == 0
              ? ""
              : data.maxReturnOrderPercentProduct.name,
          data: `${data.maxReturnOrderPercentProduct.data}%`,
        },
      ];
    } else {
      return [];
    }
  };

  const renderChar = () => {
    if (data) {
      let displayData = [
        {
          title: "Top 10 favorites product",
          data: data.top10ProductMaxFavorites,
          color: "#F48E3B",
          type: data.type,
        },
        {
          title: "Top 10 visited product",
          data: data.top10ProductMaxVisitNumber,
          color: "#d3d149",
          type: data.type,
        },
        {
          title: "Top 10 highest order product",
          data: data.top10ProductMaxOrder,
          color: "#8baf13",
          type: data.type,
        },
        {
          title: "Top 5 highest revenue product",
          data: data.top5ProductMaxRevenue,
          color: "#379614",
          type: data.type,
        },
      ];
      return displayData;
    } else {
      return [];
    }
  };

  console.log(data);
  return (
    <div className="w-full h-full flex flex-col gap-2 pb-2 overflow-y-auto overflow-x-hidden">
      <div className="h-[20%] w-full grid grid-cols-4">
        {/* SINGLE ITEM */}

        {handleRenderSingleItem().map((val, index) => {
          return (
            <SingleItemData
              key={index}
              index={index}
              data={val.data}
              subTitle={val.subTitle}
              title={val.title}
            />
          );
        })}
      </div>
      {/* CHAR */}
      <div className="w-full h-[80%] grid grid-rows-2">
        <div className="w-full grid grid-cols-2">
          {renderChar().map((val, index) => {
            if (index <= 1) {
              return (
                <CollumnChar
                  key={index}
                  data={val}
                  title={val.title}
                  color={val.color}
                />
              );
            }
          })}
        </div>
        <div className="w-full grid grid-cols-2">
          {renderChar().map((val, index) => {
            if (index > 1) {
              return (
                <CollumnChar
                  key={index}
                  data={val}
                  title={val.title}
                  color={val.color}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

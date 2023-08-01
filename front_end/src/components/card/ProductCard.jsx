import React from "react";
import StarRated from "./StarRated";
import { getAvatar, getMinPrice } from "../../utils/Utils";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/detail/${product.id}`}
      className="h-[40vh] flex flex-col w-full shadow-lg border-slate-200 border-solid border-[1px] cursor-pointer duration-300 transition-all hover:scale-95"
    >
      <div className="w-full h-[50%] shadow-sm ">
        <img src={getAvatar(product)} alt="" className="w-full h-full" />
      </div>
      <div className="w-full h-[50%] flex flex-col px-3 py-1 rounded-sm overflow-hidden">
        <div className="h-1/3 block-ellipsis text-[0.7rem] lg:text-sm">
          <p>{product ? product.name : ""}</p>
        </div>
        <div className="text-lg w-full h-1/3 text-[#F06246] flex items-center">
          <p>{`${getMinPrice(product)} $`}</p>
        </div>
        <div className="text-sm h-1/3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <StarRated scale={1} fillStar={product.rate} />
          <p className="text-[0.7rem] lg:text-sm">
            Da ban {product.saleNumber}
          </p>
        </div>
      </div>
    </Link>
  );
}

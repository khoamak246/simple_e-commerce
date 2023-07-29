import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";
import { useState } from "react";
import { useEffect } from "react";
import UpdateProducModal from "../../modal/UpdateProducModal";
import { handleRenderBusiness } from "../../../utils/Utils";
import { resetSelectBusiness } from "../../../redux/reducers/BusinessSlice";
import SelectBusinessModal from "../../modal/SelectBusinessModal";

export default function DshAllProduct() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isToggleEditModal, setToggleEditModal] = useState("");
  const [editItem, setEditItem] = useState();
  const [productNav, setProductNav] = useState({
    name: null,
    minPrice: null,
    maxPrice: null,
    business: null,
    sortBy: "default",
  });
  const [isToggleSelectBusinessModal, setToggleSelectBusinessModal] =
    useState(false);
  const handleOnChangeProductNav = (e) => {
    const { name, value } = e.target;
    setProductNav({
      ...productNav,
      [name]: name === "minPrice" || name === "maxPrice" ? +value : value,
    });
  };

  const selectBusiness = (business) => {
    setProductNav({ ...productNav, business });
  };

  const resetProductNav = () => {
    setProductNav({
      name: null,
      minPrice: null,
      maxPrice: null,
      business: null,
      sortBy: "default",
    });
    dispatch(resetSelectBusiness());
  };

  const renderProduct = () => {
    let result = [];
    if (shopSelector) {
      const { products } = shopSelector;
      result = [...products];
      const { name, minPrice, maxPrice, business, sortBy } = productNav;
      if (sortBy !== "default") {
        if (sortBy === "onSale") {
          result = result.filter((e) => e.onSale);
        } else {
          result = result.filter((e) => !e.onSale);
        }
      }

      if (business) {
        result = result.filter((e) => e.business.id === business.id);
      }

      if (name) {
        result = result.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (minPrice !== null && maxPrice !== null) {
        for (let i = 0; i < result.length; i++) {
          const { productOptions } = result[i];

          let newProductOption = productOptions.filter(
            (e) => minPrice <= e.price && e.price <= maxPrice
          );

          result[i] = { ...result[i], productOptions: newProductOption };
        }
      }
    }

    return result;
  };

  const handleSelectSpecificProduct = (productId) => {
    let productIndex = selectedProducts.indexOf(productId);
    if (productIndex < 0) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      let newSelectedProductArr = [...selectedProducts];
      newSelectedProductArr.splice(productIndex, 1);
      setSelectedProducts(newSelectedProductArr);
    }
  };

  const handleSelectAllProduct = () => {
    let productArr = renderProduct();
    let newSelectedArr = [];
    if (selectedProducts.length !== productArr.length) {
      productArr.map((e) => newSelectedArr.push(e.id));
      setSelectedProducts(newSelectedArr);
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 pb-2">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
          All product:
        </h1>
      </div>
      <div className="pl-2 h-[95%] w-full">
        <div className="w-[98%] h-[98%] shadow-lg border-solid border-slate-400 border-[1px] flex flex-col">
          <div className="h-5/12 lg:2/6 border-solid border-slate-400 border-b-[1px] grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
            {/* COL_1 */}
            <div className="w-full h-full flex flex-col items-center gap-2">
              {/* NAME */}
              <div className="flex flex-col gap-1 w-full">
                <p>Name: </p>
                <input
                  name="name"
                  type="text"
                  placeholder="Product name..."
                  className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                  maxLength={120}
                  value={productNav.name ? productNav.name : ""}
                  onChange={handleOnChangeProductNav}
                />
              </div>
              {/* BUSINESS */}
              <div
                className="flex flex-col gap-1 w-full"
                onClick={() => setToggleSelectBusinessModal(true)}
              >
                <p>Business: </p>
                <div className="border-[1px] h-[47%] border-solid border-slate-400 flex items-center justify-center rounded-sm">
                  <p
                    className={`p-2 text-sm w-[90%] outline-none cursor-pointer ${
                      null === null && "text-slate-400"
                    }`}
                  >
                    {productNav.business
                      ? handleRenderBusiness(productNav.business)
                      : "Business..."}
                  </p>
                  <div className="w-[20%] sm:w-[10%] flex justify-center border-l-[1px] border-solid border-slate-400 items-center h-full cursor-default">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-slate-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* COL_2 */}
            <div className="w-full h-full flex flex-col items-center gap-2">
              {/* PRICE */}
              <div className="flex flex-col gap-1 w-full">
                <p>Price: </p>
                <div className="flex gap-2 w-full">
                  <div className="w-[49%]">
                    <input
                      name="minPrice"
                      type="text"
                      placeholder="From..."
                      className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                      maxLength={120}
                      value={
                        productNav.minPrice !== null ? productNav.minPrice : ""
                      }
                      onChange={handleOnChangeProductNav}
                    />
                  </div>
                  <p className="w-[2%]"> - </p>
                  <div className="w-[49%]">
                    <input
                      name="maxPrice"
                      type="text"
                      placeholder="To..."
                      className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                      maxLength={120}
                      value={
                        productNav.maxPrice !== null ? productNav.maxPrice : ""
                      }
                      onChange={handleOnChangeProductNav}
                    />
                  </div>
                </div>
              </div>
              {/* SORT BY */}
              <div className="flex flex-col gap-1 w-full">
                <p>Sort by: </p>
                <select
                  name="sortBy"
                  className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                  onChange={handleOnChangeProductNav}
                >
                  <option
                    value="default"
                    selected={productNav.sortBy === "default"}
                  >
                    -- nothing --
                  </option>
                  <option
                    value="onSale"
                    selected={productNav.sortBy === "onSale"}
                  >
                    On Sale
                  </option>
                  <option
                    value="notSale"
                    selected={productNav.sortBy === "notSale"}
                  >
                    Not sale
                  </option>
                </select>
              </div>
            </div>
            {/* BUTTON */}
            <div className="flex gap-2">
              <button className="px-3 rounded-lg bg-orange-400 text-white">
                Filter
              </button>
              <button
                className="px-3 rounded-lg bg-slate-400 text-white"
                onClick={resetProductNav}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="h-7/12 lg:h-4/6 w-full">
            {/* HEADER */}
            <div className="lg:h-1/6 w-full border-solid border-slate-400 border-b-[1px] grid grid-cols-11">
              <div className="col-span-3 flex gap-1 items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAllProduct}
                  checked={
                    renderProduct().length === selectedProducts.length &&
                    renderProduct.length !== 0
                  }
                />
                <p className="text-[0.7rem] lg:text-base">Product name</p>
              </div>
              <div className="col-span-2 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <p className="text-[0.7rem] lg:text-base">Business</p>
              </div>

              <div className="col-span-4 grid grid-cols-4 border-slate-400 border-r-[1px] border-solid">
                <div className="col-span-4 border-b-[1px] border-slate-400 border-solid">
                  <p className="text-center">Option</p>
                </div>
                <div className="col-span-1 lg:px-2 border-r-[1px] border-slate-400 border-solid">
                  <p className="text-[0.7rem] lg:text-base">Name</p>
                </div>
                <div className="col-span-1 lg:px-2 border-r-[1px] border-slate-400 border-solid">
                  <p className="text-[0.7rem] lg:text-base">Price</p>
                </div>
                <div className="col-span-1 lg:px-2 border-r-[1px] border-slate-400 border-solid">
                  <p className="text-[0.7rem] lg:text-base">Stock</p>
                </div>
                <div className="col-span-1 lg:px-2">
                  <p className="text-[0.7rem] lg:text-base">Action</p>
                </div>
              </div>

              <div className="col-span-1 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2">
                <p className="text-[0.7rem] lg:text-base">On sale</p>
              </div>

              <div className="col-span-1 flex items-center lg:px-2 text-[0.7rem] lg:text-base">
                Action
              </div>
            </div>
            {/* BODY */}
            <div
              className={`h-5/6 w-full flex flex-col overflow-auto ${
                renderProduct().length === 0 && "justify-center items-center"
              }`}
            >
              {renderProduct().length === 0 ? (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fempty_state.png?alt=media&token=3e8e6738-c13f-48e7-809d-40d425854635"
                  alt=""
                  className="w-[30%]"
                />
              ) : (
                renderProduct().map((val, index, arr) => {
                  return (
                    <div
                      className="lg:h-1/6 w-full border-solid border-slate-400 border-b-[1px] grid grid-cols-11"
                      key={val.id}
                    >
                      {/* PRODUCT NAME */}
                      <div
                        className={` col-span-3 flex gap-1 items-center border-slate-400 border-r-[1px] border-solid lg:px-2`}
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleSelectSpecificProduct(val.id)}
                          checked={selectedProducts.includes(val.id)}
                        />
                        <p className="text-[0.7rem] lg:text-base">{val.name}</p>
                      </div>
                      {/* PRODUCT BUSINESS */}
                      <div
                        className={`col-span-2 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2`}
                      >
                        <p className="text-[0.7rem] lg:text-sm">
                          {shopSelector
                            ? handleRenderBusiness(val.business)
                            : ""}
                        </p>
                      </div>
                      {/* OPTION */}
                      <div className="col-span-4 grid grid-cols-1 border-slate-400 border-r-[1px] border-solid">
                        {arr[index].productOptions.map((val, index, arr) => {
                          return (
                            <div
                              className={`${
                                index !== arr.length - 1 && "border-b-[1px]"
                              } border-slate-400 border-solid grid grid-cols-4`}
                              key={val.id}
                            >
                              {/* OPTION NAME */}
                              <div className="col-span-1 flex items-center lg:px-2 border-r-[1px] border-slate-400 border-solid">
                                <p className="text-[0.7rem] lg:text-base">
                                  {val.name}
                                </p>
                              </div>
                              {/* OPTION PRICE */}
                              <div className="col-span-1 flex items-center lg:px-2 border-r-[1px] border-slate-400 border-solid">
                                <p className="text-[0.7rem] lg:text-base">
                                  {val.price}
                                </p>
                              </div>
                              {/* OPTION STOCK */}
                              <div className="col-span-1 flex items-center lg:px-2 border-r-[1px] border-slate-400 border-solid">
                                <p className="text-[0.7rem] lg:text-base">
                                  {val.stock}
                                </p>
                              </div>
                              {/* OPTION ACTION */}
                              <div className="col-span-1 flex justify-center gap-1 lg:px-2 items-center">
                                {/* EDIT */}
                                <button
                                  className="bg-orange-300 px-1 rounded-sm h-[80%]"
                                  onClick={() => {
                                    setEditItem(val);
                                    setToggleEditModal("option");
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* PRODUCT ON SALE */}
                      <div
                        className={`col-span-1 flex items-center border-slate-400 border-r-[1px] border-solid lg:px-2`}
                      >
                        <p
                          className={` text-[0.7rem] lg:text-base rounded-md ${
                            val.onSale ? "bg-green-500" : "bg-red-500"
                          } text-white font-semibold text-center px-1`}
                        >
                          {val.onSale ? "on sale" : "not sale"}
                        </p>
                      </div>
                      {/* PRODUCT ACTION */}
                      <div className="col-span-1 flex items-center justify-center lg:px-2 text-[0.7rem] lg:text-base gap-1">
                        {/* EDIT */}
                        <button
                          className="bg-orange-300 px-1 rounded-sm h-[50%]"
                          onClick={() => {
                            setEditItem(val);
                            setToggleEditModal("product");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      {/*  MODAL */}
      {(isToggleEditModal === "option" || isToggleEditModal === "product") && (
        <UpdateProducModal
          editType={isToggleEditModal}
          closeModal={() => setToggleEditModal("")}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      )}
      {isToggleSelectBusinessModal && (
        <SelectBusinessModal
          closeModal={() => setToggleSelectBusinessModal(false)}
          selectBusinessMethod={selectBusiness}
        />
      )}
    </div>
  );
}

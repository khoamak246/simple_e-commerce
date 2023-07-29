import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER_STATE_SELECTOR } from "../redux/selectors/Selectors";
import { useState } from "react";
import { useEffect } from "react";
import {
  delete_cart_item,
  patch_minus_quantity_cart_item,
  patch_udpate_status_all_cart_item,
  patch_udpate_status_cart_item,
  post_create_new_cart_item,
} from "../thunk/CartThunk";
import { toast } from "react-hot-toast";
import AddAndEditUserAddressModal from "../components/modal/AddAndEditUserAddressModal";
import { handleRenderUserAddress } from "../utils/Utils";
import {
  ERROR_FULL_NAME_MESS,
  ERROR_PHONE_NUMBER_MESS,
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
  validationRegex,
} from "../utils/Validatation";
import { post_create_new_order } from "../thunk/OrderThunk";

export default function Cart() {
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const [cart, setCart] = useState();
  const [selectCartItem, setSelecCartItem] = useState([]);
  const [toggleSelectAddressModdal, setToggleSelectAddressModal] =
    useState(false);
  const [selectAddress, setSelectAddress] = useState();
  const [orderForm, setOrderForm] = useState({
    receiverName: "",
    phoneNumber: "",
    orderItems: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (userSelector) {
      setCart(userSelector.userInfo.cart);
      handleSelectCartItem();
      if (userSelector.userInfo.userAddresses.length !== 0) {
        setSelectAddress(userSelector.userInfo.userAddresses[0]);
      }
    }
  }, [userSelector]);

  const handleSelectCartItem = () => {
    if (userSelector) {
      let cart = userSelector.userInfo.cart;
      let newSelectCartItemArr = cart.cartItems.filter((e) => e.status);
      setSelecCartItem(newSelectCartItemArr);

      let orderItems = [];
      newSelectCartItemArr.map((e) =>
        orderItems.push({
          cartItemId: e.id,
          paymentWayId: e.productOptions.product.shop.paymentWays[0].id,
        })
      );
      setOrderForm({
        receiverName: userSelector.fullName,
        phoneNumber: userSelector.phoneNumber,
        orderItems,
      });
    }
  };

  const handleSelectPaymentWayEachOrderItem = (action, cartItem, e) => {
    if (userSelector && cartItem && orderForm.orderItems.length !== 0) {
      if (action === "getValue") {
        let currentSelectPayment = orderForm.orderItems.find(
          (e) => e.cartItemId === cartItem.id
        );
        if (currentSelectPayment) {
          return currentSelectPayment.paymentWayId;
        }
      } else {
        const { value } = e.target;
        let orderItemIndex = orderForm.orderItems
          .map((e) => e.cartItemId)
          .indexOf(cartItem.id);
        if (orderItemIndex >= 0) {
          let newOrderItemFormTempArr = [...orderForm.orderItems];
          newOrderItemFormTempArr[orderItemIndex] = {
            cartItemId: cartItem.id,
            paymentWayId: +value,
          };
          setOrderForm({
            ...orderForm,
            orderItems: newOrderItemFormTempArr,
          });
        }
      }
    }
    return 0;
  };

  const handleChangeQuantity = (action, createCartItemForm, cartItem) => {
    if (action === "up") {
      dispatch(post_create_new_cart_item(createCartItemForm)).then((res) => {
        if (res) {
          toast.success("Upadte cart sucessfully!");
        }
      });
    } else {
      if (cartItem.quantity > 1) {
        dispatch(patch_minus_quantity_cart_item(cartItem.id)).then((res) => {
          if (res) {
            toast.success("Upadte cart sucessfully!");
          }
        });
      } else {
        dispatch(delete_cart_item(cartItem.id)).then((res) => {
          if (res) {
            toast.success("Upadte cart sucessfully!");
          }
        });
      }
    }
  };

  const handleOrderSubmit = () => {
    const { receiverName, phoneNumber, orderItems } = orderForm;
    if (!validationRegex(FULL_NAME_REGEX, receiverName)) {
      return toast.error(ERROR_FULL_NAME_MESS);
    }

    if (!validationRegex(PHONE_NUMBER_REGEX, phoneNumber)) {
      return toast.error(ERROR_PHONE_NUMBER_MESS);
    }

    if (orderItems.length === 0) {
      return toast.error("OOP! Not have select cart item!");
    }
    let { district, provinceCity, streetDetail, ward } = selectAddress;
    let createOrderForm = {
      ...orderForm,
      provinceCityId: provinceCity.id,
      districtId: district.id,
      wardId: ward.id,
      streetDetail,
    };

    dispatch(post_create_new_order(createOrderForm)).then((res) => {
      if (res) {
        toast.success("Order successfully!");
      }
    });
  };

  return (
    <div className="mt-2 w-screen h-auto bg-white">
      <div className="container mx-auto mt-10 h-full">
        <div className="flex flex-col lg:flex-row shadow-md my-10 h-full">
          {/* CART */}
          <div className="w-full lg:w-3/4 bg-white px-10 py-10 h-full">
            {/* NAV */}
            <div className="w-full flex flex-col h-[10%] gap-2 mb-2">
              <div className="flex w-full justify-between">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{`${
                  cart && cart.cartItems.length
                } ${
                  cart && cart.cartItems.length <= 1 ? "Item" : "Items"
                }`}</h2>
              </div>
              <div className="w-full flex gap-1">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (userSelector) {
                      let cartItemsLength =
                        userSelector.userInfo.cart.cartItems.length;

                      dispatch(
                        patch_udpate_status_all_cart_item(
                          cartItemsLength === selectCartItem.length
                        )
                      );
                    }
                  }}
                  checked={
                    userSelector &&
                    userSelector.userInfo.cart.cartItems.length ===
                      selectCartItem.length &&
                    selectCartItem.length !== 0
                  }
                />
                <p>Select all</p>
              </div>
              <div
                className="flex gap-1 cursor-pointer"
                onClick={() => {
                  setToggleSelectAddressModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 fill-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap underline">
                  {`Address: ${
                    userSelector &&
                    userSelector.userInfo.userAddresses.length === 0
                      ? "OOP! You not have any address yet! Click here to add new address!"
                      : handleRenderUserAddress(selectAddress)
                  }`}
                </p>
              </div>
            </div>
            {/* CART ITEM */}
            <div className="h-[80%] w-full overflow-x-hidden overflow-y-auto">
              <div className="lg:flex mt-10 mb-5 hidden">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cart?.cartItems?.map((val, index, arr) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row lg:flex-row items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex items-center w-full lg:w-2/5 ">
                      {/* PRO NAV */}
                      <div className="w-[10%] flex justify-center items-center">
                        <input
                          type="checkbox"
                          onChange={() => {
                            dispatch(patch_udpate_status_cart_item(val.id));
                          }}
                          checked={selectCartItem.includes(val)}
                        />
                      </div>
                      <div className="flex w-[90%]">
                        {/* AVATAR */}
                        <div className="w-20">
                          <img
                            className="h-24"
                            src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                            alt=""
                          />
                        </div>
                        {/* ACTION */}
                        <div className="flex flex-col justify-center items-start gap-1 ml-4">
                          <p className="font-bold text-sm">
                            {val.productOptions.product.name}
                          </p>
                          <p className="text-red-500 text-xs">
                            {val.productOptions.name}
                          </p>
                          {val.status && (
                            <select
                              name="paymentWayId"
                              className="w-full outline-none border-[1px] border-solid border-slate-300 rounded-sm text-sm"
                              value={handleSelectPaymentWayEachOrderItem(
                                "getValue",
                                val
                              )}
                              onChange={(e) =>
                                handleSelectPaymentWayEachOrderItem(
                                  "onChange",
                                  val,
                                  e
                                )
                              }
                            >
                              {val.productOptions.product.shop.paymentWays.map(
                                (val, index) => {
                                  return (
                                    <option key={val.id} value={val.id}>
                                      {val.name}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          )}

                          <button className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* QUANTITY */}
                    <div className="flex justify-center w-1/5">
                      <button
                        onClick={() => {
                          handleChangeQuantity("down", null, val);
                        }}
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <div className="mx-2 border text-center w-8 outline-none">
                        <p>{val.quantity}</p>
                      </div>
                      <button
                        onClick={() => {
                          const { productOptions } = val;
                          let createCartItemForm = {
                            productOptionId: productOptions.id,
                            quantity: 1,
                          };
                          handleChangeQuantity("up", createCartItemForm);
                        }}
                      >
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    {/* PRICE */}
                    <p className="text-center w-1/5 font-semibold text-sm flex justify-center gap-1">
                      <span className="sm:hidden">Price: </span>{" "}
                      {`$${val.price}`}
                    </p>
                    {/* TOTAL */}
                    <p className="text-center w-1/5 font-semibold text-sm flex justify-center gap-1">
                      <span className="sm:hidden">Total: </span>{" "}
                      {`$${val.price * val.quantity}`}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* NAVIGATE */}
            <Link
              to={"/"}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          {/* ORDER */}
          <div id="summary" className="w-full lg:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              {/* NAME */}
              <p>Name: </p>
              <input
                name="receiverName"
                type="text"
                className="outline-none border-l-[1px] border-b-[1px] border-solid border-slate-300 rounded-sm pl-1"
                value={orderForm.receiverName}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, receiverName: e.target.value })
                }
              />
            </div>
            {/* PHONE NUMBER */}
            <div className="flex justify-between mt-10 mb-5">
              <p>Phone: </p>
              <input
                name="phoneNumber"
                type="text"
                className="outline-none border-l-[1px] border-b-[1px] border-solid border-slate-300 rounded-sm pl-1"
                value={orderForm.phoneNumber}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">{` ${
                cart && cart.cartItems.length == 1 ? "Item" : "Items"
              }  ${cart && cart.cartItems.length}`}</span>
              <span className="font-semibold text-sm">{`${
                cart && cart.total
              }$`}</span>
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">SHIPPING</span>
              <span className="font-semibold text-sm">{`${
                cart && (cart.total / 100) * 10
              }$`}</span>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{`$${cart && (cart.total * 110) / 100}`}</span>
              </div>
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={handleOrderSubmit}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}
      {toggleSelectAddressModdal && (
        <AddAndEditUserAddressModal
          setSelectAddress={setSelectAddress}
          selectAddress={selectAddress}
          closeModal={() => setToggleSelectAddressModal(false)}
        />
      )}
    </div>
  );
}

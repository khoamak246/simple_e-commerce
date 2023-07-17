import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
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
                <h2 className="font-semibold text-2xl">3 Items</h2>
              </div>
              <div className="w-full flex gap-1">
                <input type="checkbox" />
                <p>Select all</p>
              </div>
            </div>

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
              {[1, 1, 1].map((val, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row lg:flex-row items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex items-center w-full lg:w-2/5 ">
                      {/* PRO NAV */}
                      <div className="w-[10%] flex justify-center items-center">
                        <input type="checkbox" />
                      </div>
                      <div className="flex w-[90%]">
                        <div className="w-20">
                          <img
                            className="h-24"
                            src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">Iphone 6S</span>
                          <span className="text-red-500 text-xs">Apple</span>
                          <a
                            href="#"
                            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                          >
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        defaultValue={1}
                      />
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <p className="text-center w-1/5 font-semibold text-sm flex gap-1">
                      <span className="sm:hidden">Price: </span> $400.00
                    </p>
                    <p className="text-center w-1/5 font-semibold text-sm flex gap-1">
                      <span className="sm:hidden">Total: </span> $400.00
                    </p>
                  </div>
                );
              })}
            </div>

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
              <span className="font-semibold text-sm uppercase">Items 3</span>
              <span className="font-semibold text-sm">590$</span>
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">SHIPPING</span>
              <span className="font-semibold text-sm">10$</span>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

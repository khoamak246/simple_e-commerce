import React, { useState } from "react";
import PreviewImg from "../carousel/previewImg";

export default function CreateProductModal() {
  const [modalAction, setModalAction] = useState("inputInfo");
  const [testArr, setTestArr] = useState([1, 1]);
  const testImgArr = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/image%2Fy2mate.com%20-%20The%20FUNNIEST%20Animals%20Being%20Absolute%20Jerks%20Pets%20Dogs%20Cats%20Shorts_480p.mp4094bfb82-475b-401b-951c-4828a61dbd4f?alt=media&token=08f7dfb8-9cac-4c09-ad11-73c4c667e29d",
      assetType: "video",
    },
    {
      url: "https://englishlikeanative.co.uk/wp-content/uploads/2021/09/Animal-idioms-for-ESL-students-learning-English..jpg",
      assetType: "img",
    },
    {
      url: "https://englishlikeanative.co.uk/wp-content/uploads/2021/09/Animal-idioms-for-ESL-students-learning-English..jpg",
      assetType: "img",
    },
    {
      url: "https://englishlikeanative.co.uk/wp-content/uploads/2021/09/Animal-idioms-for-ESL-students-learning-English..jpg",
      assetType: "img",
    },
  ];
  return (
    <div className="w-screen h-screen backdrop-blur-sm bg-white/30 fixed top-0 left-0 flex justify-center items-center">
      <div className="w-full h-full sm:w-[80%] sm:h-[80%] bg-white shadow-2xl border-[1px] border-solid border-slate-200 rounded-md flex relative">
        <div
          className={`${
            modalAction === "inputInfo" && "hidden"
          } absolute top-3 left-3 cursor-pointer`}
          onClick={() => setModalAction("inputInfo")}
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
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        {modalAction === "inputInfo" ? (
          <>
            {" "}
            <div className="w-1/3 bg-orange-300 flex flex-col items-center justify-center gap-2">
              <div className=" lg:w-64 lg:h-64 bg-white rounded-md border-slate-300 border-[1px] border-solid shadow-lg flex justify-center items-center">
                <div className="w-5/6 h-5/6 border-[1px] border-solid border-slate-300 rounded-md">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/userAssets%2F360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpge4acf53a-ecca-4a7b-9365-76e4677e8581?alt=media&token=5fd1bca4-a30d-4e89-a72c-bb8fafdf18ec"
                    alt="product-img"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="w-[50%] relative">
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />
                  <button className="bg-white rounded-sm py-1 px-2 w-full">
                    Preview Image
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="w-[50%] relative">
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />
                  <button className="bg-white rounded-sm py-1 px-2 w-full">
                    Detail Image (0)
                  </button>
                </div>
                <button
                  className="bg-orange-500 rounded-lg py-1 px-1 text-sm text-white font-semibold"
                  onClick={() => setModalAction("previewImg")}
                >
                  Show image slide
                </button>
              </div>
            </div>
            <div className="w-2/3 bg-white flex justify-end pl-5 py-2">
              <div className="w-full h-full flex flex-col gap-2 relative">
                <div className="w-full flex flex-col gap-1">
                  <h2 className="font-semibold">Product name:</h2>
                  <input
                    name="productName"
                    type="text"
                    placeholder="Product name..."
                    className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1 text-sm"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <h2 className="font-semibold">Description:</h2>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="Product name..."
                    className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1 resize-none text-sm"
                    maxLength={255}
                  />
                </div>
                {/* OPTION */}
                <div className="w-full h-[40%] lg:h-[50%]">
                  <h2 className="font-semibold">Option:</h2>
                  <div className="w-full h-full flex gap-2">
                    <div className="w-[90%] h-full border-[1px] border-solid border-slate-500 flex flex-col items-center py-2 gap-2">
                      {testArr.map((val, index) => {
                        return (
                          <div
                            key={index}
                            className="w-[95%] h-14 border-[1px] border-solid border-red-400 rounded-md flex items-center over"
                          >
                            {/* ICON */}
                            <div
                              className="w-1/12 flex justify-center items-center"
                              draggable={true}
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
                                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                />
                              </svg>
                            </div>
                            {/* OPTION  */}
                            <p className="w-6/12 border-l-[1px] border-solid border-slate-400 pl-1">
                              Option name
                            </p>

                            {/* PRICE */}
                            <p className="w-3/12 border-l-[1px] border-solid border-slate-400 pl-1">
                              Price
                            </p>

                            {/* EDIT */}
                            <div className="w-1/12 border-l-[1px] border-solid border-slate-400 flex justify-center cursor-pointer">
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

                            {/* DELETE */}
                            <div className="w-1/12 border-l-[1px] border-solid border-slate-400 flex justify-center cursor-pointer">
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-[10%] cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[3%] right-[3%] flex gap-3">
                  <button className="bg-orange-300 rounded-md py-1 px-4 text-white font-semibold">
                    Save
                  </button>
                  <button className="bg-slate-400 rounded-md py-1 px-3 text-white font-semibold">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PreviewImg previewArr={testImgArr} />
        )}
      </div>
    </div>
  );
}

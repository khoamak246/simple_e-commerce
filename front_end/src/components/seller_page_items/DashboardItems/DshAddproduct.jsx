import React, { useEffect, useState } from "react";
import DshUploadItems from "./DshUploadItems";

import {
  BUSINESS_LIST_SELECTOR,
  BUSINESS_SELECTED_SELECTOR,
} from "../../../redux/selectors/Selectors";
import { useDispatch, useSelector } from "react-redux";
import SelectBusinessModal from "../../modal/SelectBusinessModal";
import { toast } from "react-hot-toast";
import {
  firebase_multiple_upload,
  firebase_single_upload,
} from "../../../firebase/FirebaseService";
import { post_create_new_product } from "../../../thunk/ProductThunk";
import { resetToggle, setToggle } from "../../../redux/reducers/ToggleSlice";
import { resetSelectBusiness } from "../../../redux/reducers/BusinessSlice";

export default function DshAddproduct() {
  const dispatch = useDispatch();
  const [isSelectCatalog, setIsSelectCatalog] = useState(false);
  const businessSelector = useSelector(BUSINESS_LIST_SELECTOR);
  const selectBusiness = useSelector(BUSINESS_SELECTED_SELECTOR);
  const [isCreateOption, setCreateOption] = useState(false);
  const handleRenderResultSelectBusiness = () => {
    let ressult = "Product catalog...";
    let { businessIndex, subBusinessIndex, childrenBusinessIndex } =
      selectBusiness;
    if (businessIndex !== null) {
      ressult = businessSelector[businessIndex].name;
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
  const [inputCreateProductForm, setInputCreateProductForm] = useState({
    name: "",
    description: "",
    productOptions: [],
    imgList: [],
    video: null,
  });
  const [createInputProductOptionForm, setInputCreateProductOptionForm] =
    useState({
      name: "",
      price: "",
      stock: "",
    });

  const [actionOptionForm, setActionOptionForm] = useState({
    action: "add",
    data: null,
  });

  const handleChooseImg = (e) => {
    let file = e.target.files;
    console.log(file);
    if (file && file.length <= 5) {
      setInputCreateProductForm({
        ...inputCreateProductForm,
        imgList: [...inputCreateProductForm.imgList, ...file],
      });
    } else {
      toast.error("OOP! You can not select image more than five");
    }
  };

  const handleOnchangeInputCreateProductForm = (e) => {
    let { name, value } = e.target;
    setInputCreateProductForm({ ...inputCreateProductForm, [name]: value });
  };

  const handleChooseVideo = (e) => {
    let file = e.target.files;
    if (file) {
      setInputCreateProductForm({
        ...inputCreateProductForm,
        video: file[0],
      });
    }
  };

  const handleInputProductOption = (e) => {
    let { name, value } = e.target;
    setInputCreateProductOptionForm({
      ...createInputProductOptionForm,
      [name]: value,
    });
  };

  const handleDeleteOption = (index) => {
    let tempArr = inputCreateProductForm.productOptions.splice(index, 1);
    setInputCreateProductOptionForm({
      ...inputCreateProductForm,
      productOptions: tempArr,
    });
  };

  const handleEditOption = (index) => {
    let newOptionArr = inputCreateProductForm.productOptions;
    newOptionArr[index] = createInputProductOptionForm;
    setInputCreateProductOptionForm({
      ...inputCreateProductForm,
      productOptions: newOptionArr,
    });
    setActionOptionForm({ ...actionOptionForm, data: index });
  };

  const handleAddOption = () => {
    for (const key in createInputProductOptionForm) {
      if (
        createInputProductOptionForm[key] === "" &&
        (key == "price" || key == "stock")
      ) {
        return toast.error("OOP! You forgot input something!");
      }
    }

    let currentOptionArrLength = inputCreateProductForm.productOptions.length;
    const { name, price, stock } = createInputProductOptionForm;

    if (Number.isNaN(Number(price))) {
      return toast.error("Price must be number");
    }

    if (Number.isNaN(Number(stock))) {
      return toast.error("Stock must be number");
    }
    if (currentOptionArrLength !== 0) {
      if (name === "") {
        return toast.error(
          "You can not add defaut product option when have another option in list"
        );
      } else {
        if (inputCreateProductForm.productOptions[0].name === "") {
          return toast.error(
            "You can not add another option when have default option in list"
          );
        }
      }
    }

    setInputCreateProductForm({
      ...inputCreateProductForm,
      productOptions: [
        ...inputCreateProductForm.productOptions,
        createInputProductOptionForm,
      ],
    });
  };

  const hanleResetOptionInput = () => {
    setInputCreateProductOptionForm({
      name: "",
      price: "",
      stock: "",
    });

    setActionOptionForm({
      action: "add",
      data: null,
    });
  };

  const hanleConfirmCreateProductOption = () => {
    if (actionOptionForm.action === "edit") {
      handleEditOption(actionOptionForm.data);
    } else {
      handleAddOption();
    }

    hanleResetOptionInput();
    setCreateOption(false);
  };

  const handleAddNewProduct = async () => {
    for (const key in inputCreateProductForm) {
      let value = inputCreateProductForm[key];
      if (value === null || value === "" || value.length === 0) {
        return toast.error("OOP! Something missing please check again!");
      }
    }

    dispatch(setToggle("loading"));
    let { name, description, productOptions, imgList, video } =
      inputCreateProductForm;
    let assetList = [];

    let urlVideo = await firebase_single_upload(video);
    assetList.push({
      url: urlVideo.split("_assetType:")[0],
      assetType: "video",
    });

    let imgArr = await firebase_multiple_upload(imgList);

    imgArr.forEach((element) => {
      assetList.push({
        url: element.split("_assetType:")[0],
        assetType: "image",
      });
    });

    let createProductForm = { name, description, productOptions, assetList };

    dispatch(post_create_new_product(createProductForm)).then((res) => {
      if (res) {
        dispatch(resetToggle());
        dispatch(resetSelectBusiness());
        toast.success("Add new product successfully!");
      }
    });

    setInputCreateProductForm({
      name: "",
      description: "",
      productOptions: [],
      imgList: [],
      video: null,
    });
  };

  const resetAll = () => {
    document.getElementById("inputImg").value = "";
    document.getElementById("inputVideo").value = "";
    setInputCreateProductForm({
      name: "",
      description: "",
      productOptions: [],
      imgList: [],
      video: null,
    });

    hanleResetOptionInput();
    setActionOptionForm({
      action: "add",
      data: null,
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-end gap-5 overflow-auto">
      <h1 className="w-full text-xl font-semibold p-2 h-[5%]">
        Add new product:
      </h1>
      <div className="w-[98%] h-[95%] flex flex-col justify-start gap-3">
        <h2 className="font-semibold">Basic infomation:</h2>
        <div className="w-full flex flex-col gap-3">
          {/* UPLOAD IMG */}
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-[50%] sm:w-[14%] text-sm">Product img:</div>
            <div className="w-[86%]">
              <div className="border-[1px] border-dashed border-slate-400 w-20 h-20 cursor-pointer hover:bg-[#FDF3F1] flex flex-col justify-center items-center rounded-md relative">
                <input
                  id="inputImg"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  multiple={true}
                  onChange={handleChooseImg}
                  accept="image/*"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#EE4D2D]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <p className="text-sm text-[#EE4D2D]">{`Image (${inputCreateProductForm.imgList.length}/5)`}</p>
              </div>
            </div>
          </div>

          {/* UPLOAD VIDEO */}
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-[50%] sm:w-[14%] text-sm">Product video:</div>
            <div className="w-[86%]">
              <div className="border-[1px] border-dashed border-slate-400 w-20 h-20 cursor-pointer hover:bg-[#FDF3F1] flex flex-col justify-center items-center rounded-md relative">
                <input
                  id="inputVideo"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  accept="video/*"
                  onChange={handleChooseVideo}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#EE4D2D]"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <p className="text-sm text-[#EE4D2D]">{`Video (${
                  inputCreateProductForm.video ? "1" : "0"
                }/1)`}</p>
              </div>
            </div>
          </div>

          {/* PRODUCT NAME */}
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-[50%] sm:w-[14%]  text-sm">Product name:</div>
            <div className="w-[90%] sm:w-[70%] border-[1px] border-solid border-slate-400 rounded-md overflow-hidden flex items-center justify-center">
              <input
                name="name"
                type="text"
                placeholder="Product name..."
                className="  p-2 text-sm w-[80%] sm:w-[90%] outline-none"
                max={120}
                onChange={handleOnchangeInputCreateProductForm}
                value={inputCreateProductForm.name}
              />
              <div className="w-[20%] sm:w-[10%] flex justify-center border-l-[1px] border-solid border-slate-400 items-center h-full cursor-default">
                <p className="text-slate-400 text-sm">{`${inputCreateProductForm.name.length}/120`}</p>
              </div>
            </div>
          </div>

          {/* PRODUCT BUSINESS */}
          <div
            className="w-full flex flex-col sm:flex-row"
            onClick={() => setIsSelectCatalog(true)}
          >
            <div className="w-[50%] sm:w-[14%] text-sm">Product business:</div>
            <div className="w-[90%] sm:w-[70%] border-[1px] border-solid border-slate-400 rounded-md overflow-hidden flex items-center justify-center">
              <p
                className={`p-2 text-sm w-[90%] outline-none cursor-pointer ${
                  selectBusiness.businessIndex === null && "text-slate-400"
                }`}
              >
                {handleRenderResultSelectBusiness()}
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

          {/* PRODUCT DESCRIPTION */}
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-[50%] sm:w-[14%] text-sm">
              Product description:
            </div>
            <div className="w-[90%] sm:w-[70%] flex flex-col items-center justify-center">
              <textarea
                onChange={handleOnchangeInputCreateProductForm}
                name="description"
                id=""
                cols="30"
                rows="10"
                className="w-full resize-none text-sm outline-none p-2 border-[1px] border-solid border-slate-400  rounded-md"
                placeholder="Product description..."
                maxLength={3000}
                value={inputCreateProductForm.description}
              ></textarea>
              <div className="w-full flex justify-end">
                <p className="text-sm text-slate-400">{`${inputCreateProductForm.description.length}/3000`}</p>
              </div>
            </div>
          </div>

          {/* OPTION */}
          <h2 className="font-semibold">
            Option infomation:{" "}
            <span className="text-sm text-red-400">
              (If your product have no option, you can create an option without
              enter field name)
            </span>
          </h2>
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-[50%] sm:w-[14%] text-sm">Product option:</div>
            <div className="w-[90%] sm:w-[70%] h-[300px] border-[1px] border-solid border-slate-400 rounded-md grid grid-cols-1 mb-5 overflow-auto relative gap-5 pb-5 px-3">
              {!isCreateOption && (
                <div
                  className="sticky top-0 left-0 w-full flex justify-end py-1"
                  onClick={() => setCreateOption(true)}
                >
                  <div className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              )}
              {isCreateOption && (
                <div
                  className={`sticky top-0 left-0 w-full h-14 flex justify-center items-center bg-[#E6C191] rounded-b-md gap-2 px-2`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      hanleConfirmCreateProductOption();
                    }
                  }}
                >
                  <input
                    name="name"
                    type="text"
                    placeholder="Option name..."
                    className="text-sm py-1 px-2 rounded-sm outline-none w-[40%]"
                    onChange={handleInputProductOption}
                    value={createInputProductOptionForm.name}
                  />
                  <input
                    name="price"
                    type="text"
                    placeholder="Price..."
                    className="text-sm py-1 px-2 rounded-sm outline-none w-[20%]"
                    onChange={handleInputProductOption}
                    value={createInputProductOptionForm.price}
                  />
                  <input
                    name="stock"
                    type="text"
                    placeholder="Stock..."
                    className="text-sm py-1 px-2 rounded-sm outline-none w-[20%]"
                    onChange={handleInputProductOption}
                    value={createInputProductOptionForm.stock}
                  />
                  <button
                    className="bg-orange-400 px-2 py-1 rounded-md w-[10%] flex justify-center items-center"
                    onClick={hanleConfirmCreateProductOption}
                  >
                    <p className="hidden lg:block">save</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 lg:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button className="bg-slate-400 px-2 py-1 rounded-md w-[10%] flex justify-center items-center">
                    <p
                      className="hidden lg:block"
                      onClick={() => {
                        hanleResetOptionInput();
                        setCreateOption(false);
                      }}
                    >
                      cancel
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 lg:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {!isCreateOption &&
                inputCreateProductForm.productOptions.map((val, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[95%] h-[70px] border-[1px] border-solid border-red-400 rounded-md flex items-center over"
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
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>

                      {/* OPTION  */}
                      <p className="w-6/12 border-l-[1px] border-solid border-slate-400 pl-1 text-sm">
                        {val.name}
                      </p>

                      {/* PRICE */}
                      <p className="w-3/12 border-l-[1px] border-solid border-slate-400 pl-1 text-sm">
                        {val.price}
                      </p>

                      {/* STOCK */}
                      <p className="w-3/12 border-l-[1px] border-solid border-slate-400 pl-1 text-sm">
                        {val.stock}
                      </p>

                      {/* EDIT */}
                      <div
                        className="w-1/12 border-l-[1px] border-solid border-slate-400 flex justify-center cursor-pointer"
                        onClick={() => {
                          setInputCreateProductOptionForm({
                            name: val.name,
                            price: val.price,
                            stock: val.stock,
                          });
                          setActionOptionForm({ action: "edit", data: index });
                          setCreateOption(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </div>

                      {/* DELETE */}
                      <div
                        className="w-1/12 border-l-[1px] border-solid border-slate-400 flex justify-center cursor-pointer"
                        onClick={() => handleDeleteOption(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
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
          </div>

          {/* CONFIRM BUTTON */}
          <div className="flex justify-end gap-2 items-center mb-6 mr-4">
            <button
              className="border-[1px] border-solid border-slate-300 rounded-md py-1 px-2"
              onClick={resetAll}
            >
              Cancel
            </button>
            <button
              className="bg-[#EE4D2D] py-1 px-2 rounded-md text-white"
              onClick={handleAddNewProduct}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      {/* SELECT CATALOG MODAL */}
      {isSelectCatalog && (
        <SelectBusinessModal toggleModal={setIsSelectCatalog} />
      )}
    </div>
  );
}

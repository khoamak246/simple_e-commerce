import React from "react";
import ProductCard from "../../card/ProductCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";
import {
  delete_collection,
  patch_update_collection,
  post_save_new_collection,
} from "../../../thunk/CollectionThunk";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { sortByIdASC } from "../../../utils/Utils";

export default function DshShopCollection() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const [isAddCollection, setAddCollection] = useState(false);
  const [inputNewCollectionName, setInputNewCollectionName] = useState("");
  const dispatch = useDispatch();
  const [selectedCollection, setSellectedCollection] = useState();
  const [collectionNav, setCollecionNav] = useState({
    searchingValue: "",
    sortBy: "default",
    currentPage: 1,
    totalPage: 1,
    selectEditCollection: null,
  });

  useEffect(() => {
    if (shopSelector && selectedCollection) {
      let currentSelectCollection = shopSelector.collections.find(
        (e) => e.id == selectedCollection.id
      );
      setSellectedCollection(currentSelectCollection);
    }
  }, [shopSelector]);

  const handleResetAll = () => {
    setAddCollection(false);
    setInputNewCollectionName("");
  };

  const handleCreateAndUpdateCollection = () => {
    if (inputNewCollectionName.length === 0) {
      return toast.error("OOP! Somethign wrong with your collection name!");
    }
    if (collectionNav.selectEditCollection == null) {
      createNewCollection();
    } else {
      updateCollectionName();
    }
  };

  const createNewCollection = () => {
    let findExistInCollection = shopSelector.collections.find(
      (e) => e.name.toLowerCase() == inputNewCollectionName.toLowerCase().trim()
    );
    if (findExistInCollection) {
      return toast.error("OOP! You already have a collection with this name ");
    }

    dispatch(post_save_new_collection(inputNewCollectionName.trim())).then(
      (res) => {
        if (res) {
          toast.success("Create new collection successfully!");
          handleResetAll();
          setSellectedCollection(sortByIdASC(res)[res.length - 1]);
        }
      }
    );
  };

  const updateCollectionName = () => {
    dispatch(
      patch_update_collection({
        collectionId: collectionNav.selectEditCollection,
        updateCollectionForm: {
          name: inputNewCollectionName,
        },
      })
    ).then((res) => {
      if (res) {
        toast.success("Update collection successfully!");
        setCollecionNav({
          ...collectionNav,
          selectEditCollection: null,
        });
        handleResetAll();
      }
    });
  };

  const handleDeleteCollection = (collectionId) => {
    dispatch(delete_collection(collectionId)).then((res) => {
      if (res) {
        toast.success("Delete collection successfully!");
      }
    });
  };

  const handleOnSearch = () => {
    let result = [];
    if (shopSelector) {
      const { products } = shopSelector;
      if (collectionNav.searchingValue !== "") {
        let currentproductArr = [...products];
        result = currentproductArr.filter((product) =>
          product.name
            .toLowerCase()
            .includes(collectionNav.searchingValue.toLowerCase())
        );
      }
    }
    return result;
  };

  const handleRenderProduct = () => {
    let productArr = [];
    if (collectionNav.searchingValue !== "") {
      productArr = handleOnSearch();
    } else if (shopSelector && selectedCollection) {
      const { collections } = shopSelector;
      if (collections.length !== 0) {
        productArr = selectedCollection.products;
        switch (collectionNav.sortBy) {
          case "name-asc":
            productArr.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            break;
          case "name-desc":
            productArr.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
            break;
          case "price-asc":
            productArr.sort(function (a, b) {
              if (handleGetMinPrice(a) < handleGetMinPrice(b)) {
                return -1;
              }
              if (handleGetMinPrice(a) > handleGetMinPrice(b)) {
                return 1;
              }
              return 0;
            });
            break;
          case "price-desc":
            productArr.sort(function (a, b) {
              if (handleGetMinPrice(a) < handleGetMinPrice(b)) {
                return 1;
              }
              if (handleGetMinPrice(a) > handleGetMinPrice(b)) {
                return -1;
              }
              return 0;
            });
            break;
          default:
            productArr.toReversed();
            break;
        }
        console.log(productArr);

        return productArr.filter(
          (e) =>
            collectionNav.currentPage - 1 <= productArr.indexOf(e) &&
            productArr.indexOf(e) <= collectionNav.currentPage + 6
        );
      }
    }

    return productArr;
  };

  const handleGetMinPrice = (product) => {
    if (product) {
      const { productOptions } = product;
      return Math.min(
        ...productOptions.map((productOption) => productOption.price)
      );
    } else {
      return 0;
    }
  };

  const handleOnChangeCollectionNav = (e) => {
    const { name, value } = e.target;
    setCollecionNav({ ...collectionNav, [name]: value });
  };

  const checkExistInCollection = (productId) => {
    let check = false;
    if (shopSelector && selectedCollection) {
      const { collections } = shopSelector;
      if (collections.length !== 0) {
        let productIndex = selectedCollection.products.find(
          (product) => product.id == productId
        );
        if (productIndex) {
          check = true;
        }
      }
    }
    return check;
  };

  const handleUpdateProductInCollection = (productId, action) => {
    if (shopSelector && selectedCollection) {
      let products = [];
      selectedCollection.products.map((product) => products.push(product.id));
      if (action === "ADD") {
        products.push(productId);
      } else {
        let productIndex = products.indexOf(productId);
        products.splice(productIndex, 1);
      }
      dispatch(
        patch_update_collection({
          collectionId: selectedCollection.id,
          updateCollectionForm: {
            products,
          },
        })
      ).then((res) => {
        if (res) {
          setCollecionNav({
            searchingValue: "",
            sortBy: "",
            currentPage: 1,
            totalPage: 1,
            selectEditCollection: null,
          });
          handleResetAll();
          toast.success("Add product to collection successfully!");
        }
      });
    }
  };

  const getTotalPageProduct = () => {
    let totalPage = 1;
    if (shopSelector) {
      const { collections } = shopSelector;
      if (
        collections.length !== 0 &&
        selectedCollection &&
        selectedCollection.products.length !== 0
      ) {
        let productArrLength = selectedCollection.products.length;
        if (productArrLength % 6 !== 0) {
          totalPage =
            totalPage + ((productArrLength - (productArrLength % 6)) % 6);
        }
      }
    }
    return totalPage;
  };

  const isStillPageUpOrPageDown = () => {
    let totalPage = getTotalPageProduct();
    let { currentPage } = collectionNav;
    if ((currentPage == totalPage) == 1) {
      return "NOT_ALL";
    } else if (currentPage == totalPage) {
      return "NOT_UP";
    } else {
      return "NOT_DOWN";
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2">Shop Collection:</h1>
      </div>
      <div className="pl-2 w-full h-[95%]">
        <div className="w-[95%] h-[95%] border-solid border-[1px] border-slate-400 grid grid-cols-3">
          {/* COLLECTION NAME */}
          <div className="h-full grid-cols-1 col-span-1 overflow-auto border-r-[1px] border-solid border-slate-400">
            {/* TITLE */}
            <div className="flex justify-between items-center w-full gap-2 py-2 pl-2 border-b-[1px] border-solid border-slate-400 relative">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 hidden sm:block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                <h2 className="font-semibold">Collection</h2>
              </div>
              <div className="cursor-pointer flex gap-1 group">
                <p className="w-0 h-5 group-hover:w-auto group-hover:px-2 text-[0.8rem] text-white rounded-md bg-[#EF5234] text-center overflow-hidden transition-all duration-200">
                  Add collection
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setAddCollection(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>
              {/* ADD COLLECTION */}
              <div
                className={`${
                  isAddCollection ? "h-full" : "h-0"
                } absolute w-full top-0 left-0 bg-slate-200 overflow-hidden flex justify-around items-center transition-all duration-200`}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Collection name..."
                  className="text-sm px-2 py-1 rounded-sm border-[1px] outline-none"
                  maxLength={120}
                  value={inputNewCollectionName}
                  onChange={(e) => setInputNewCollectionName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateAndUpdateCollection();
                    }
                  }}
                />
                <button
                  className="px-2 text-sm bg-orange-300 rounded-sm text-white"
                  onClick={handleCreateAndUpdateCollection}
                >
                  Add
                </button>
                <button
                  className="px-2 text-sm bg-slate-400 rounded-sm text-white"
                  onClick={() => {
                    handleResetAll();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            {/* ITEMS */}
            {shopSelector &&
              sortByIdASC(shopSelector.collections).map((val, index) => {
                return (
                  <div
                    key={val.id}
                    className={`${
                      selectedCollection &&
                      val.id === selectedCollection.id &&
                      "bg-slate-200"
                    } w-full flex justify-between border-solid border-b-[1px]  border-slate-400 items-center py-2 px-2 duration-200 transition-all hover:bg-slate-200 group`}
                    onClick={() => setSellectedCollection(val)}
                  >
                    <p className="text-sm text-slate-400 cursor-pointer w-[80%]">
                      {val.name}
                    </p>
                    <div className="flex items-center justify-center group-hover:gap-1 duration-500 transition-all">
                      <div className="flex gap-1 items-center">
                        <p className="text-sm text-[#F04D2D]">
                          {val.products.length}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-slate-400 hidden sm:block"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </div>
                      <div className="flex w-0 group-hover:gap-1 group-hover:w-auto items-center justify-center overflow-hidden duration-300 transition-all">
                        {/* EDIT */}
                        <button
                          className="bg-orange-300 p-1 rounded-sm"
                          onClick={() => {
                            setInputNewCollectionName(val.name);
                            setAddCollection(true);
                            setCollecionNav({
                              ...collectionNav,
                              selectEditCollection: val.id,
                            });
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
                        {/* DELETE */}
                        <button
                          className="bg-red-400 p-1 rounded-sm"
                          onClick={() => handleDeleteCollection(val.id)}
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
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* PRODUCT */}
          <div className="col-span-2 h-full">
            {/* NAV */}
            <div className="items-center w-full gap-2 py-2 px-2 border-b-[1px] border-solid border-slate-400 grid grid-cols-5">
              {/* TITLE */}
              <div className="flex gap-1 items-center col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 hidden lg:block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                <h2 className="font-semibold">Product</h2>
              </div>

              <div className="col-span-4 grid grid-cols-2 gap-2">
                {/* SEARCH */}
                <div className="w-full h-full flex items-center">
                  <input
                    name="searchingValue"
                    type="text"
                    placeholder="Search..."
                    className="border-[1px] border-solid border-slate-400 outline-none rounded-sm text-sm px-1 w-full"
                    maxLength={120}
                    value={collectionNav.searchingValue}
                    onChange={handleOnChangeCollectionNav}
                    disabled={
                      !shopSelector ||
                      shopSelector.collections.length == 0 ||
                      !selectedCollection
                    }
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 items-center">
                  {/* SORT */}
                  <div className="w-full h-[90%] border-solid border-[1px] border-slate-400 flex justify-between items-center px-1 cursor-pointer rounded-sm relative">
                    <select
                      name="sortBy"
                      className="absolute top-0 left-0 w-full h-full flex items-center outline-none text-sm"
                      onChange={handleOnChangeCollectionNav}
                    >
                      <option value="default">Sort by</option>
                      <option value="name-asc">Name-ASC</option>
                      <option value="name-desc">Name-DESC</option>
                      <option value="price-asc">Name-ASC</option>
                      <option value="price-desc">Name-DESC</option>
                    </select>
                  </div>
                  {/* PAGE */}
                  <div className="w-full h-full grid grid-cols-2 items-center gap-1">
                    <div className="text-sm w-full flex justify-end">
                      <p>{`${
                        collectionNav.currentPage
                      }/${getTotalPageProduct()}`}</p>
                    </div>
                    <div className=" w-full h-full grid grid-cols-2 border-[1px] border-solid border-slate-200">
                      {/* DOWN */}
                      <button
                        className={`${
                          (isStillPageUpOrPageDown() === "NOT_ALL" ||
                            isStillPageUpOrPageDown() === "NOT_DOWN") &&
                          "bg-slate-200"
                        } flex justify-center items-center `}
                        disabled={
                          isStillPageUpOrPageDown() === "NOT_ALL" ||
                          isStillPageUpOrPageDown() === "NOT_DOWN"
                        }
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
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
                      {/* UP */}
                      <button
                        className={`${
                          (isStillPageUpOrPageDown() === "NOT_ALL" ||
                            isStillPageUpOrPageDown() === "NOT_UP") &&
                          "bg-slate-200"
                        } flex justify-center items-center`}
                        disabled={
                          isStillPageUpOrPageDown() === "NOT_ALL" ||
                          isStillPageUpOrPageDown() === "NOT_DOWN"
                        }
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
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCT */}
            {shopSelector && (
              <div
                className={`h-[90%] overflow-auto ${
                  shopSelector.collections.length !== 0 &&
                  selectedCollection &&
                  (selectedCollection.products.length !== 0 ||
                    collectionNav.searchingValue !== "")
                    ? "grid grid-cols-1 sm:grid-cols-3 gap-2 "
                    : "flex justify-center items-center flex-col"
                } p-2`}
              >
                {(shopSelector.collections.length == 0 ||
                  (selectedCollection &&
                    selectedCollection.products.length == 0)) &&
                collectionNav.searchingValue === "" ? (
                  <>
                    <p
                      className={`${
                        selectedCollection &&
                        selectedCollection.products.length == 0 &&
                        "hidden"
                      } text-[#EF5234] font-semibold text-xl`}
                    >
                      OOP! Nothing here! Please add new collection!
                    </p>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fempty_state.png?alt=media&token=3e8e6738-c13f-48e7-809d-40d425854635"
                      alt=""
                      className="w-full"
                      draggable={false}
                    />
                  </>
                ) : (
                  handleRenderProduct().map((val, index) => {
                    return (
                      <div key={index} className="relative group h-[40vh]">
                        <ProductCard product={val} />
                        <div
                          className="absolute w-full h-0 group-hover:h-[20%] bottom-0 left-0 bg-orange-400 duration-300 transition-all scale-95 hover:scale-100 flex justify-center items-center gap-2 overflow-hidden text-white font-semibold cursor-pointer"
                          onClick={() => {
                            if (!checkExistInCollection(val.id)) {
                              handleUpdateProductInCollection(val.id, "ADD");
                            } else {
                              handleUpdateProductInCollection(val.id, "DELETE");
                            }
                          }}
                        >
                          {!checkExistInCollection(val.id) ? (
                            <div className="w-full h-full flex justify-center items-center gap-2">
                              <div>
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
                              <p> Add</p>
                            </div>
                          ) : (
                            <p>Already in collection</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

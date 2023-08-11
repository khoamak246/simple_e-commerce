import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { get_shop_by_id, post_save_new_follower } from "../thunk/ShopThunk";
import {
  getMinPrice,
  isExistRoomWithShopId,
  sortByIdASC,
} from "../utils/Utils";
import {
  ROOM_ROOM_LIST_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../redux/selectors/Selectors";
import { toast } from "react-hot-toast";

export default function ShopDetail() {
  const dispatch = useDispatch();
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const roomListSelector = useSelector(ROOM_ROOM_LIST_STATE_SELECTOR);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [shop, setShop] = useState();
  const [activeTab, setActiveTab] = useState(-2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [filterNav, setFilterNav] = useState({
    type: "popular",
    sort: "p-asc",
    page: 1,
  });
  console.log(shop);

  const firstInfoBar = [
    {
      title: "Product: ",
      icon: (
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
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
      data: shop ? shop.products.length : 0,
    },
    {
      title: "Follower: ",
      icon: (
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
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      ),
      data: shop ? shop.followers.length : 0,
    },
    {
      title: "Rate: ",
      icon: (
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
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ),
      data: `${shop ? shop.rate : 0}/5`,
    },
    {
      title: "Join: ",
      icon: (
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
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
      data: shop ? shop.createdDate : 0,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispath(get_shop_by_id(param.shopId)).then((res) => {
      if (res) {
        setShop(res);
        setDisplayProduct(res.products);
      } else {
        navigate("*");
      }
    });
  };

  const handleRenderCollections = () => {
    if (shop) {
      let { collections } = shop;
      return [
        {
          id: -2,
          name: "All product",
          products: shop.products,
        },
        ...collections,
      ];
    } else {
      return [];
    }
  };

  const handleSeclectTab = (tab) => {
    setActiveTab(tab.id);
    setDisplayProduct(tab.products);
  };

  const handleRenderProduct = () => {
    if (displayProduct) {
      let renderProductArr = [];
      displayProduct.map((e) => {
        if (!e.block && e.onSale) {
          renderProductArr.push(e);
        }
      });

      if (filterNav.type == "bestSeller") {
        renderProductArr.sort((a, b) => {
          if (a.saleNumber > b.saleNumber) {
            return 1;
          } else if (a.saleNumber < b.saleNumber) {
            return -1;
          } else {
            return 0;
          }
        });
      }

      if (filterNav.sort === "p-acs") {
        renderProductArr.sort((a, b) => {
          if (getMinPrice(a) > getMinPrice(b)) {
            return 1;
          } else if (getMinPrice(a) < getMinPrice(b)) {
            return -1;
          } else {
            return 0;
          }
        });
      }

      if (filterNav.sort === "p-desc") {
        renderProductArr.sort((a, b) => {
          if (getMinPrice(a) > getMinPrice(b)) {
            return -1;
          } else if (getMinPrice(a) < getMinPrice(b)) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      let result = renderProductArr.filter(
        (e) =>
          (filterNav.page - 1) * 20 <= renderProductArr.indexOf(e) &&
          renderProductArr.indexOf(e) < (filterNav.page - 1) * 20 + 20
      );

      return result;
    } else {
      return [];
    }
  };

  const handleTotalPage = () => {
    if (displayProduct.length <= 20) {
      return 1;
    } else {
      if (displayProduct.length % 20 === 0) {
        return displayProduct.length / 20;
      } else {
        return (displayProduct.length - (displayProduct.length % 20)) / 20 + 1;
      }
    }
  };

  const handleOnToggleChat = () => {
    if (roomListSelector && shop) {
      if (isExistRoomWithShopId(roomListSelector, shop.id)) {
        dispatch(setToggle("chat"));
      } else {
        dispatch(post_create_room(shop.id)).then((res) => {
          if (res) {
            dispatch(setToggle("chat"));
          }
        });
      }
    }
  };

  return (
    <div className=" w-screen">
      {/* NAV */}
      <div className="h-[33vh] bg-white">
        <div className="h-[80%] w-full flex justify-center items-center">
          <div className="w-[90%] h-[70%] grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="w-full h-full bg-orange-300 overflow-hidden relative rounded-md">
              {/* COVER IMG */}
              <img
                src={shop ? shop.coverImg : ""}
                alt=""
                className="w-full h-full"
              />
              <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full flex items-center gap-3 px-5">
                {/* AVATAR */}
                <img
                  src={shop ? shop.avatar : ""}
                  alt=""
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <h2 className="text-white text-xl w-full">
                    {shop && shop.name}
                  </h2>
                  <div className="w-full flex flex-col sm:flex-row gap-2">
                    <button
                      className="w-[50%] text-white flex justify-center items-center border-white border-[1px] border-solid gap-2"
                      onClick={() => {
                        if (!userSelector) {
                          toast("OOP! You need login to use this service!", {
                            icon: "👏",
                          });
                        } else {
                          dispath(post_save_new_follower(shop.id)).then(
                            (res) => {
                              if (res) {
                                fetchData();
                              }
                            }
                          );
                        }
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <p>
                        {shop &&
                        userSelector &&
                        shop.followers.findIndex(
                          (e) => e.id === userSelector.id
                        ) >= 0
                          ? "Unfollow"
                          : "Follow"}
                      </p>
                    </button>
                    <button
                      className="w-[50%] text-white flex justify-center items-center border-white border-[1px] border-solid gap-2"
                      onClick={handleOnToggleChat}
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
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>

                      <p>Chat</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden w-full h-full md:flex flex-col gap-2 justify-center">
              {firstInfoBar.map((val, index) => {
                if (index <= 1) {
                  return (
                    <div
                      className="w-full flex items-center gap-2 text-sm"
                      key={index}
                    >
                      {val.icon}
                      <p>
                        {val.title}
                        <span className="text-[#EF4D2D] font-semibold">
                          {val.data}
                        </span>
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            <div className="hidden w-full h-full md:flex flex-col gap-2 justify-center">
              {firstInfoBar.map((val, index) => {
                if (index > 1) {
                  return (
                    <div
                      className="w-full flex items-center gap-2 text-sm"
                      key={index}
                    >
                      {val.icon}
                      <p>
                        {val.title}
                        <span className="text-[#EF4D2D] font-semibold">
                          {val.data}
                        </span>
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        {/* COLLECTION */}
        <div className="h-[20%] w-full flex justify-center items-center">
          <div className="w-[90%] h-full flex gap-5">
            {shop &&
              handleRenderCollections().map((val, index) => {
                return (
                  <div
                    key={val.id}
                    className={`${
                      val.id === activeTab &&
                      "border-b-[2px] border-solid border-[#EE4D2D]"
                    } w-[10vw] cursor-pointer`}
                    onClick={() => handleSeclectTab(val)}
                  >
                    <p className="text-center text-ellipsis overflow-hidden whitespace-nowrap">
                      {val.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* TODO: create function render - with delete button  */}
      {/* DECOR */}
      {/* <div className="w-full px-5 py-2 relative">
        <div className="cursor-pointer">
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="absolute top-[25%] left-[4%] flex z-[30]">
          <div className="bg-white shadow-xl flex flex-col gap-2 rounded-lg border-solid border-[1px] border-slate-300 px-2 py-2">
            <p className="hover:bg-slate-200 cursor-pointer">Slide</p>
            <p className="hover:bg-slate-200 cursor-pointer">Image/video</p>
            <p className="hover:bg-slate-200 cursor-pointer">
              Text with image/video
            </p>
            <p className="hover:bg-slate-200 cursor-pointer">Collection</p>
          </div>
          <div className="bg-white shadow-xl flex flex-col gap-2 rounded-lg border-solid border-[1px] border-slate-300 px-2 py-2">
            <p className="hover:bg-slate-200 cursor-pointer">Slide</p>
            <p className="hover:bg-slate-200 cursor-pointer">Image/video</p>
            <p className="hover:bg-slate-200 cursor-pointer">
              Text with image/video
            </p>
            <p className="hover:bg-slate-200 cursor-pointer">Collection</p>
          </div>
        </div>
      </div> */}

      {/* INTRODUCE */}
      <div className="w-full overflow-hidden flex justify-center items-center cursor-pointer mt-5 ">
        <div className="w-[95%] bg-white flex flex-col md:flex-row rounded-lg overflow-hidden">
          <div className="w-full md:w-[50%] flex justify-center items-center">
            <img src={shop ? shop.coverImg : ""} className="w-full" />
          </div>
          <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-2 ">
            <h1 className="text-[2.4rem] italic text-[#F3A847] font-serif">
              {shop && shop.name}
            </h1>
            <h2 className="text-xl italic font-serif w-[70%] text-center">
              {shop && shop.description}
            </h2>
          </div>
        </div>
      </div>

      {shop && shop.introduce.length !== 0 && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div
            id="indicators-carousel"
            className="relative w-[95%] h-[80%]"
            data-carousel="static"
          >
            {/* Carousel wrapper */}
            <div className="relative h-full overflow-hidden rounded-lg md:h-96">
              {[...sortByIdASC(shop.introduce).map((e) => e.url)].map(
                (val, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        currentSlide === index ? "w-full h-full" : "w-0"
                      } duration-700 ease-in-out overflow-hidden`}
                      data-carousel-item="active"
                    >
                      <img
                        src={val}
                        className="absolute block w-full h-full"
                        alt="..."
                        draggable={false}
                      />
                    </div>
                  );
                }
              )}
            </div>

            {/* Slider controls */}
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev=""
              onClick={() => {
                if (shop) {
                  let slide = [...shop.introduce.map((e) => e.url)];
                  if (currentSlide > 0) {
                    setCurrentSlide((prev) => prev - 1);
                  }
                }
              }}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next=""
              onClick={() => {
                if (shop) {
                  let slide = [...shop.introduce.map((e) => e.url)];
                  if (currentSlide < slide.length - 1) {
                    setCurrentSlide((prev) => prev + 1);
                  }
                }
              }}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      )}
      {/* COLLECTION */}
      <div className="mt-5 w-screen flex flex-col px-5">
        <div className="w-full flex gap-3">
          <div className="w-[20%] bg-white">
            <div className="w-full flex gap-2 py-2 border-b-[1px] border-solid border-slate-300">
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
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p>Danh muc</p>
            </div>
            <div className="w-full flex flex-col gap-2 py-4">
              {shop &&
                handleRenderCollections().map((val, index) => {
                  return (
                    <div
                      className={`w-full flex gap-2 items-center ${
                        activeTab === val.id && "text-[#EE606E] font-semibold"
                      } cursor-pointer`}
                      key={val.id}
                      onClick={() => handleSeclectTab(val)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>{val.name}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-[80%] bg-white">
            {/* SORT NAV */}
            <div className="w-full flex gap-2 py-2 bg-[#EDEDED] justify-between sm:px-5">
              <div className="scale-[80%] sm:scale-100 w-[70%] flex items-center gap-3">
                <p>Sort by: </p>
                {[
                  { name: "Popular", value: "popular" },
                  { name: "Best seller", value: "bestSeller" },
                ].map((val, index) => {
                  return (
                    <div
                      className={`${
                        filterNav.type === val.value
                          ? "bg-[#F05D40] text-white font-semibold"
                          : "bg-white"
                      } h-full w-[15%]  py-1 flex justify-center items-center rounded-sm cursor-pointer`}
                      key={index}
                      onClick={() =>
                        setFilterNav({ ...filterNav, type: val.value })
                      }
                    >
                      <p className="text-[0.7rem] sm:text-base">{val.name}</p>
                    </div>
                  );
                })}
                <div className="h-full bg-white py-1 w-[30%] flex justify-between items-center rounded-sm cursor-pointer px-2">
                  <select
                    name=""
                    id=""
                    className="w-full"
                    value={filterNav.sort}
                    onChange={(e) =>
                      setFilterNav({ ...filterNav, sort: e.target.value })
                    }
                  >
                    <option value="p-asc">Price asc</option>
                    <option value="p-desc">Price desc</option>
                  </select>
                </div>
              </div>
              <div className="scale-[80%] sm:scale-100 w-[30%] flex justify-end items-center gap-2">
                <p>1/{handleTotalPage()}</p>
                <div className="h-full bg-white w-[5vw] flex justify-between items-center rounded-sm cursor-pointer">
                  <button
                    className={`${
                      filterNav.page === 1 &&
                      "border-slate-300 cursor-pointer bg-slate-300"
                    } w-[50%] h-full flex justify-center items-center border-r-[1px] border-solid `}
                    disabled={filterNav.page === 1}
                    onClick={() => {
                      if (filterNav.page > 1) {
                        setFilterNav({
                          ...filterNav,
                          page: filterNav.page - 1,
                        });
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className={`${
                      filterNav.page === handleTotalPage() &&
                      "border-slate-300 cursor-pointer bg-slate-300"
                    } w-[50%] h-full flex justify-center items-center cursor-pointer`}
                    disabled={filterNav.page === handleTotalPage()}
                    onClick={() => {
                      if (filterNav.page < handleTotalPage()) {
                        setFilterNav({
                          ...filterNav,
                          page: filterNav.page + 1,
                        });
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 p-2 gap-3">
              {handleRenderProduct().map((val, index) => {
                return (
                  <div className="w-full h-full" key={index}>
                    <ProductCard product={val} />
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

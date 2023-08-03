import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PreviewImg from "../components/carousel/previewImg";
import ProductCard from "../components/card/ProductCard";
import StarRated from "../components/card/StarRated";
import ReviewItem from "../components/shopDetail_page_items/ReviewItem";
import { useEffect } from "react";
import { GET_FIND_PRODUCT_BY_ID } from "../api/service/ProductService";
import {
  getMaxPrice,
  getMinPrice,
  handleRenderBusiness,
  renderAddress,
  handleRenderCurrentSelectAddress,
  getProductOptionById,
  sortByIdASC,
  sortAssetsProduct,
  getParentBusiness,
} from "../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDRESS_STATE_SELECTOR,
  ROOM_ROOM_LIST_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../redux/selectors/Selectors";
import { setToggle } from "../redux/reducers/ToggleSlice";
import { post_create_new_cart_item } from "../thunk/CartThunk";
import { toast } from "react-hot-toast";
import { post_save_favorites } from "../thunk/ProductThunk";
import { get_product_by_business_id } from "../thunk/BusinessThunk";
import { post_create_room } from "../thunk/UserRoomThunk";
import { isExistRoomWithShopId } from "../utils/Utils";

export default function ProductDetail() {
  const [product, setProduct] = useState();
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const [selectComment, setSelectComment] = useState(6);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomListSelector = useSelector(ROOM_ROOM_LIST_STATE_SELECTOR);
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const shopInfo = [
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
      data: product ? product.shop.productNumber : 0,
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
      data: product ? product.shop.followers.length : 0,
    },
    {
      title: "Visit: ",
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
      data: `${product ? product.visitNumber : 0}`,
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
      data: product ? product.shop.createdDate : "",
    },
  ];
  const [selectedProduct, setSelectedProduct] = useState({
    productOptionId: 0,
    quantity: 1,
  });
  const [recommnendProducts, setRecommendProducts] = useState([]);

  useEffect(() => {
    if (product) {
      handleSelectFirstProductOptionHaveStock();
      if (!recommnendProducts) {
        dispatch(
          get_product_by_business_id(getParentBusiness(product.business).id)
        ).then((res) => {
          if (res) {
            setRecommendProducts(res);
          }
        });
      }
    }
  }, [product]);

  const handleSelectFirstProductOptionHaveStock = () => {
    if (product) {
      const { productOptions } = product;
      let productOption = sortByIdASC(productOptions).find((e) => e.stock > 0);
      if (productOption) {
        setSelectedProduct({
          quantity: 1,
          productOptionId: productOption.id,
        });
      } else {
        navigate("*");
      }
    }
    return null;
  };

  useEffect(() => {
    async function fetchData() {
      await GET_FIND_PRODUCT_BY_ID(param.productId).then((res) => {
        if (
          res.status === 200 &&
          res.data.data.onSale &&
          !res.data.data.block
        ) {
          setProduct(res.data.data);
        } else {
          navigate("*");
        }
      });
    }

    fetchData();
  }, []);

  const handleChangeQuantity = (action) => {
    let nexQuantity = 1;
    if (action === "down") {
      if (selectedProduct.quantity > 1) {
        nexQuantity = selectedProduct.quantity - 1;
      }
    } else {
      let stock = getProductOptionById(
        product,
        selectedProduct.productOptionId
      ).stock;
      if (selectedProduct.quantity < stock) {
        nexQuantity = selectedProduct.quantity + 1;
      } else {
        nexQuantity = stock;
      }
    }

    setSelectedProduct({ ...selectedProduct, quantity: nexQuantity });
  };

  const handleRenderBusinessWithLink = () => {
    if (product) {
      let businessArr = [product.business];
      let temp = { ...product.business };
      while (temp.business.length !== 0) {
        businessArr.push(temp.business[0]);
        temp = temp.business[0];
      }
      return businessArr.reverse().map((val, index) => {
        return (
          <Link
            key={index}
            to={`/categories/${val.id}`}
            className="text-blue-600"
          >
            {`${val.name} >`}
          </Link>
        );
      });
    } else {
      return "";
    }
  };

  const handleAddToCart = (isNavigate) => {
    if (!userSelector) {
      return toast("OOP! You need login to use this service!", {
        icon: "👏",
        duration: 2000,
      });
    }

    dispatch(post_create_new_cart_item(selectedProduct)).then((res) => {
      if (res) {
        toast.success("Add to cart successfully!");
        if (isNavigate === true) {
          navigate("/cart/detail");
        }
      }
    });
  };

  const handleOnToggleChat = (shopId) => {
    if (isExistRoomWithShopId(roomListSelector, shopId)) {
      dispatch(setToggle("chat"));
    } else {
      dispatch(post_create_room(shopId)).then((res) => {
        if (res) {
          dispatch(setToggle("chat"));
        }
      });
    }
  };

  return (
    <div className="w-screen flex flex-col px-5 gap-5">
      {/* BUSINESS */}
      <div className="w-full flex gap-1 items-center py-2 text-sm sm:text-base">
        <Link to={"/"} className="text-blue-600">
          EON {" > "}
        </Link>
        {handleRenderBusinessWithLink()}
      </div>
      {/* PRODUCT PREVIEW */}
      <div className="w-full bg-white rounded-sm flex flex-col sm:flex-row gap-5">
        {/* PREVIEW  */}
        <div className="w-full sm:w-1/3 h-[80vh] border-solid border-r-[1px] border-slate-200">
          {product && (
            <PreviewImg previewArr={sortAssetsProduct(product.assets)} />
          )}
          {product && (
            <div className="h-[10%] flex justify-center items-center border-t-[1px] border-slate-200 border-solid text-red-500 gap-1">
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (!userSelector) {
                    return toast("OOP! You need login to use this service!", {
                      icon: "👏",
                      duration: 2000,
                    });
                  }
                  dispatch(post_save_favorites(product.id)).then((res) => {
                    if (res) {
                      setProduct(res);
                    }
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    userSelector &&
                    userSelector.userInfo.favoritesProduct.findIndex(
                      (e) => e.id === product.id
                    ) >= 0 &&
                    "fill-red-500 text-red-500"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <p>{`Like (${product && product.favorites.length})`}</p>
            </div>
          )}
        </div>
        {/* SALE */}
        <div className="w-full sm:w-2/3 flex flex-col py-2 justify-around">
          {/* NAME */}
          <h1 className="text-xl w-full">{product && product.name}</h1>
          {/* SALE INFO */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
            {/* RATED */}
            <div className="col-span-1 flex items-center gap-1 border-r-[1px] border-slate-300 border-solid text-[#D0011B]">
              <p>{product && product.rate}</p>
              <div className="flex">
                {product && <StarRated scale={1} fillStar={product.rate} />}
              </div>
            </div>
            {/* COMMENT NUMBER */}
            <div className="col-span-1 flex items-center gap-1 border-r-[1px] border-slate-300 border-solid text-[#D0011B]">
              <p>{product && product.reviewNumber}</p>
              <p>Comment</p>
            </div>
            {/* SALES */}
            <div className="col-span-1 flex items-center gap-1 text-[#D0011B]">
              <p>{product && product.saleNumber}</p>
              <p>Sales</p>
            </div>
            <div className="col-span-3 flex justify-end pr-5 text-[#757575] cursor-pointer">
              <p>Report</p>
            </div>
          </div>
          {/* PRICE */}
          <div className="w-full flex bg-[#FAFAFA] py-2">
            {product && (
              <p className="text-2xl text-[#D0011B]">{`${
                product.productOptions.find(
                  (e) => e.id === selectedProduct.productOptionId
                )?.price
              } $`}</p>
            )}
          </div>
          {/* DELIVER */}
          <div className="grid grid-cols-12">
            <div className="col-span-2 text-sm text-[#757575]">Address</div>
            <div className="col-span-10 flex flex-col gap-1">
              {/* FROM */}
              <div className="flex items-center gap-1">
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
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
                <p className="text-[#757575] text-sm">
                  From:{" "}
                  <span className="text-black">
                    {product && renderAddress(product.shop)}
                  </span>
                </p>
              </div>
              <p
                className="text-[#757575] text-sm pl-6 cursor-pointer"
                onClick={() => dispatch(setToggle("selectAddress"))}
              >
                To:{" "}
                <span className="text-black">
                  {product &&
                    addressSelector &&
                    handleRenderCurrentSelectAddress(addressSelector, true)}
                </span>
              </p>
              <p className="text-[#757575] text-sm pl-6">
                Transportation:{" "}
                <span className="text-black">
                  {product && (getMinPrice(product) * 110) / 100}$
                </span>
              </p>
            </div>
          </div>
          {/* OPTION */}
          <div className="grid grid-cols-12">
            <div className="col-span-2 text-sm text-[#757575]">Option</div>
            <div className="col-span-10 grid grid-cols-3 gap-2">
              {product &&
                sortByIdASC(product.productOptions).map((val, index) => {
                  return (
                    <p
                      key={val.id}
                      className={` ${
                        selectedProduct.productOptionId == val.id
                          ? "text-[#D0011B] border-[#D0011B]"
                          : "text-black border-slate-400"
                      } text-sm border-solid border-[1px] p-1 ${
                        val.stock > 0 &&
                        "hover:text-[#D0011B] hover:border-[#D0011B]"
                      }  cursor-pointer ${val.stock <= 0 && "opacity-50"}`}
                      onClick={() => {
                        if (val.stock > 0) {
                          setSelectedProduct({
                            ...selectedProduct,
                            productOptionId: val.id,
                          });
                        }
                      }}
                    >
                      {val.name}
                    </p>
                  );
                })}
            </div>
          </div>
          {/* NUMBER */}
          <div className="grid grid-cols-12">
            <div className="col-span-2 text-sm text-[#757575]">Quantity</div>
            <div className="col-span-10 flex gap-2 items-center">
              <div className="w-1/4">
                <div className="w-[80%] h-full grid grid-cols-4 border-solid border-[1px] border-slate-400 py-1">
                  <div
                    className="col-span-1 flex justify-center items-center cursor-pointer border-solid border-r-[1px] border-slate-400"
                    onClick={() => handleChangeQuantity("down")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.0}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  </div>
                  <div className="col-span-2 text-sm flex justify-center items-center border-solid border-r-[1px] border-slate-400">
                    {product && selectedProduct.quantity}
                  </div>
                  <div
                    className="col-span-1 flex justify-center items-center cursor-pointer"
                    onClick={() => handleChangeQuantity("up")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.0}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <p className="text-sm">{`${
                  product
                    ? getProductOptionById(
                        product,
                        selectedProduct.productOptionId
                      )
                      ? getProductOptionById(
                          product,
                          selectedProduct.productOptionId
                        ).stock
                      : 0
                    : 0
                } products available`}</p>
              </div>
            </div>
          </div>
          {/* BUTTON */}
          <div className="w-full flex gap-2">
            <button
              className="bg-[#FDF3F4] py-2 px-3 text-[#D41830] border-[#D41830] border-solid border-[1px] flex gap-1"
              onClick={handleAddToCart}
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Add to cart
            </button>
            <button
              className="bg-[#D41830] py-2 px-3 text-white"
              onClick={() => handleAddToCart(true)}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {/* RECOMMEND */}
      <div className="w-full bg-white rounded-sm flex p-3 gap-2 justify-center items-center">
        <div className="w-[80%] h-full flex flex-col gap-3">
          <h2 className="text-xl">RECOMMEND FOR YOU</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 border-solid border-[#EF5739] border-r-[1px]">
            {recommnendProducts.map((val, index) => {
              if (index < 5) {
                return <ProductCard key={index} product={val} />;
              }
            })}
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-center items-center gap-2">
          <p>And more product</p>
          <Link
            to={
              product
                ? `/categories/${getParentBusiness(product.business).id}`
                : ""
            }
            className="bg-[#FFEEE8] text-[#EF5739] py-1 px-2 border-solid border-[#EF5739] border-[1px]"
          >
            See more...
          </Link>
        </div>
      </div>
      {/* SHOP INFO */}
      <div className="w-full bg-white rounded-sm py-5 px-10 grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* AVATAR */}
        <div className="w-full h-full flex items-center gap-3 border-solid border-slate-300 border-r-[1px]">
          <img
            src={product ? product.shop.avatar : ""}
            alt=""
            className="w-24 h-24 rounded-full"
          />
          <div className="w-[50%] flex flex-col gap-2">
            <h2>{product && product.shop.name}</h2>
            <div className="flex gap-2">
              {/* CHAT BTN */}
              <button
                className="bg-[#FFEEE8] button-theme w-[50%] flex justify-center items-center  gap-2"
                onClick={() => handleOnToggleChat(product.shop.id)}
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
              <Link
                to={product ? `/shop/detail/${product.shop.id}` : ""}
                className="w-[50%] flex justify-center items-center border-black border-[1px] border-solid gap-2"
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
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                <p>Shop</p>
              </Link>
            </div>
          </div>
        </div>
        {/* COL_1 */}
        <div className="w-full h-full flex flex-col items-center justify-center border-solid border-slate-300 border-r-[1px]">
          {shopInfo.map((val, index) => {
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
        {/* COL_2 */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          {shopInfo.map((val, index) => {
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
      {/* PRODUCT DETAIL */}
      <div className="w-full bg-white rounded-sm p-5 flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <p className="text-xl bg-[#FAFAFA] py-1">OVERVIEW</p>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full lg:w-[50%] grid grid-cols-3 gap-2 text-sm">
              <div className="col-span-1 text-[#A3A3B3]">Business</div>
              <div className="col-span-2">
                {product && handleRenderBusiness(product.business)}
              </div>
            </div>
            <div className="w-full lg:w-[50%] grid grid-cols-3 gap-2 text-sm">
              <div className="col-span-1 text-[#A3A3B3]">Name:</div>
              <div className="col-span-2">{product && product.name}</div>
            </div>
            <div className="w-full lg:w-[50%] grid grid-cols-3 gap-2 text-sm">
              <div className="col-span-1 text-[#A3A3B3]">Send from:</div>
              <div className="col-span-2">
                {product && product.shop.provinceCity.name}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-xl bg-[#FAFAFA] py-1">DESCRIPTION</p>
          <div>
            <pre className="text-sm font-sans">{`${
              product && product.description
            }`}</pre>
          </div>
        </div>
      </div>
      {/* COMMENT */}
      <div className="w-full bg-white rounded-sm p-5 flex flex-col gap-3">
        <h2>COMMENT</h2>
        <div className="button-theme py-5 grid grid-cols-8">
          <div className="col-span-2 w-full h-full flex flex-col justify-center items-center gap-2">
            <p className="text-base sm:text-lg lg:text-3xl text-[#EE4D2D] flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-3 h-3 sm:hidden`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              {`${product && product.rate} on 5`}
            </p>
            <div className="hidden sm:block">
              {product && <StarRated scale={2} fillStar={product.rate} />}
            </div>
          </div>
          <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-0">
            <div className="w-full h-full flex justify-center items-center">
              <button
                className={`${
                  selectComment === 6
                    ? "button-theme"
                    : "border-solid border-slate-300 border-[1px]"
                }  px-12 py-1`}
                onClick={() => setSelectComment(6)}
              >
                All
              </button>
            </div>
            {[5, 4, 3, 2, 1].map((val, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full flex justify-center items-center"
                >
                  <button
                    className={` ${
                      selectComment === val
                        ? "button-theme"
                        : "border-solid border-slate-300 border-[1px]"
                    } px-10 py-1`}
                    onClick={() => setSelectComment(val)}
                  >
                    {`${val} star`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* REVIEW ITEMS */}
        <div className="w-full flex flex-col gap-10 py-2">
          {product?.reviews
            ?.filter((e) => e.rated <= selectComment)
            .map((val, index) => {
              return <ReviewItem key={index} review={val} />;
            })}
        </div>
      </div>
    </div>
  );
}

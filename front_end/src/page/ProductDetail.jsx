import React, { useState } from "react";
import { Link } from "react-router-dom";
import PreviewImg from "../components/carousel/previewImg";
import ProductCard from "../components/card/ProductCard";
import StarRated from "../components/card/StarRated";
import CommentItems from "../components/shopDetail_page_items/CommentItems";

export default function ProductDetail() {
  const [selectPreviewIndex, setPreviewIndex] = useState(0);
  const previewArr = [
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
      data: 615,
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
      data: 615,
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
      data: "4 / 5",
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
      data: "5 năm trươc",
    },
  ];
  return (
    <div className="w-screen flex flex-col px-5 gap-5">
      {/* BUSINESS */}
      <div className="w-full flex items-center py-2 text-sm sm:text-base">
        <Link to={"/"} className="text-blue-600">
          EON
        </Link>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <Link to={"/"} className="text-blue-600">
          Noi that va doi song
        </Link>
      </div>
      {/* PRODUCT PREVIEW */}
      <div className="w-full bg-white rounded-sm flex flex-col sm:flex-row gap-5">
        {/* PREVIEW  */}
        <div className="w-full sm:w-1/3 h-[80vh] border-solid border-r-[1px] border-slate-200">
          <PreviewImg previewArr={previewArr} />
          <div className="h-[10%] flex justify-center items-center border-t-[1px] border-slate-200 border-solid text-red-500 gap-1">
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <p>Like (9.2k)</p>
          </div>
        </div>
        {/* SALE */}
        <div className="w-full sm:w-2/3 flex flex-col py-2 justify-around">
          {/* NAME */}
          <h1 className="text-xl w-full">
            ZIFRIEND KA6406 Bàn Phím Cơ 63 Phím Có Đèn Nền RGB 60% Dành Cho Game
            Thủ Văn phòng chơi game Led Rainbow
          </h1>
          {/* SALE INFO */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
            {/* RATED */}
            <div className="col-span-1 flex items-center gap-1 border-r-[1px] border-slate-300 border-solid text-[#D0011B]">
              <p>4.7</p>
              <div className="flex">
                <StarRated scale={1} />
              </div>
            </div>
            {/* COMMENT NUMBER */}
            <div className="col-span-1 flex items-center gap-1 border-r-[1px] border-slate-300 border-solid text-[#D0011B]">
              <p>130</p>
              <p>Comment</p>
            </div>
            {/* SALES */}
            <div className="col-span-1 flex items-center gap-1 text-[#D0011B]">
              <p>362</p>
              <p>Sales</p>
            </div>
            <div className="col-span-3 flex justify-end pr-5 text-[#757575]">
              <p>Report</p>
            </div>
          </div>
          {/* PRICE */}
          <div className="w-full flex bg-[#FAFAFA] py-2">
            <p className="text-2xl text-[#D0011B]">{`400$ - 600$`}</p>
          </div>
          {/* DELIVER */}
          <div className="grid grid-cols-12">
            <div className="col-span-2 text-sm text-[#757575]">Address</div>
            <div className="col-span-10 flex flex-col gap-1">
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
                    Thi Tran Dong Anh, Dong Anh, Ha Noi
                  </span>
                </p>
              </div>
              <p className="text-[#757575] text-sm pl-6">
                To:{" "}
                <span className="text-black">
                  Thi Tran Dong Anh, Dong Anh, Ha Noi
                </span>
              </p>
              <p className="text-[#757575] text-sm pl-6">
                Transportation: <span className="text-black">30$</span>
              </p>
            </div>
          </div>
          {/* OPTION */}
          <div className="grid grid-cols-12">
            <div className="col-span-2 text-sm text-[#757575]">Option</div>
            <div className="col-span-10 grid grid-cols-3 gap-2">
              {[1, 1, 1, 1, 1].map((val, index) => {
                return (
                  <p
                    key={index}
                    className="text-black text-sm border-solid border-slate-400 border-[1px] p-1 hover:text-[#D0011B] cursor-pointer hover:border-[#D0011B]"
                  >
                    Thi Tran Dong Anh, Dong Anh
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
                  <div className="col-span-1 flex justify-center items-center cursor-pointer border-solid border-r-[1px] border-slate-400">
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
                    1
                  </div>
                  <div className="col-span-1 flex justify-center items-center cursor-pointer">
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
                <p className="text-sm">9541 products available</p>
              </div>
            </div>
          </div>
          {/* BUTTON */}
          <div className="w-full flex gap-2">
            <button className="bg-[#FDF3F4] py-2 px-3 text-[#D41830] border-[#D41830] border-solid border-[1px] flex gap-1">
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
            <button className="bg-[#D41830] py-2 px-3 text-white">
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
            {[1, 1, 1, 1, 1].map((val, index) => {
              return <ProductCard key={index} />;
            })}
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-center items-center gap-2">
          <p>And more product</p>
          <button className="bg-[#FFEEE8] text-[#EF5739] py-1 px-2 border-solid border-[#EF5739] border-[1px]">
            See more...
          </button>
        </div>
      </div>
      {/* SHOP INFO */}
      <div className="w-full bg-white rounded-sm py-5 px-10 grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* AVATAR */}
        <div className="w-full h-full flex items-center gap-3 border-solid border-slate-300 border-r-[1px]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/userAssets%2F360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpg7b6b140d-b22e-4a5f-a5ed-2829d1cd6fdd?alt=media&token=97140e93-1841-4a14-8172-180a7d4edced"
            alt=""
            className="w-24 h-24 rounded-full"
          />
          <div className="w-[50%] flex flex-col gap-2">
            <h2>Anh Khoa</h2>
            <div className="flex gap-2">
              <button className="bg-[#FFEEE8] button-theme w-[50%] flex justify-center items-center  gap-2">
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
              <button className="w-[50%] flex justify-center items-center border-black border-[1px] border-solid gap-2">
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
              </button>
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
                EON {">"} Noi That {">"} Gia dinh
              </div>
            </div>
            <div className="w-full lg:w-[50%] grid grid-cols-3 gap-2 text-sm">
              <div className="col-span-1 text-[#A3A3B3]">Name:</div>
              <div className="col-span-2">
                ZIFRIEND KA6406 Bàn Phím Cơ 63 Phím Có Đèn Nền RGB 60% Dành Cho
                Game Thủ Văn phòng chơi game Led Rainbow
              </div>
            </div>
            <div className="w-full lg:w-[50%] grid grid-cols-3 gap-2 text-sm">
              <div className="col-span-1 text-[#A3A3B3]">Send from:</div>
              <div className="col-span-2">Ha Noi</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-xl bg-[#FAFAFA] py-1">DESCRIPTION</p>
          <div>
            <p className="text-sm ">{`Switch phím cơ Coputa trục cơ bàn phím Blue Switch/Red Switch/Brown Switch/Black Switch ${"\n"}

Switch là bộ phận có dạng công tắc nằm dưới mỗi phím bấm. Mỗi chiếc công tắc switch được tạo thành từ nhiều phần chuyển động, dùng lò xo để tạo đàn hồi và có 2 (hoặc nhiều) chân tiếp xúc bằng kim loại.
Đối với bàn phím cơ, Switch có tác dụng đem lại độ phản hồi tốt, lực nhấn phím nhẹ hơn 1 chiếc bàn phím thông thường.

Thông tin sản phẩm: Switch phím cơ Coputa trục cơ bàn phím Blue Switch/Red Switch/Brown Switch/Black Switch
- Dòng Switch được sử dụng rất nhiều cho các mẫu phím cơ trên thị trường hiện nay với độ bền lên tới 50 triệu lượt nhấn

Switch Blue (xanh dương ) :
 + khi bấm có tiếng Click
 + có khấc
 + Hành trình phím 4.0mm
 + Lực nhấn 50g

Switch Red ( Đỏ ) :
 + khi bấm không có tiếng click
 + Không có khấc
 + Hành trình phím 4.0mm
 + Lực nhấn 45g

Switch Brown ( Nâu ) :
 + khi bấm không có tiếng click
 + có khấc
 + Hành trình phím 4.0mm
 + Lực nhấn 45g

Switch Black ( Đen ) :
 + khi bấm không có tiếng click
 + Không có khấc
 + Hành trình phím 4.0mm
 + Lực nhấn 60g

Hướng dẫn sử dụng: Switch phím cơ Coputa trục cơ bàn phím Blue Switch/Red Switch/Brown Switch/Black Switch
- Tháo Keycap để lộ ra phần Switch.
- Tháo Switch bằng các công cụ kẹp.
- Lắp Switch mới đúng chiều.
- Lắp Keycap và sử dụng.

Coputa đảm bảo:
- Hình ảnh sản phẩm giống 100%.
- Chất lượng sản phẩm tốt 100%.
- Sản phẩm được kiểm tra kĩ càng, nghiêm ngặt trước khi giao hàng.
- Sản phẩm luôn có sẵn trong kho hàng. 
- Hoàn tiền ngay nếu sản phẩm không giống với mô tả.
- Đổi trả ngay theo quy định nếu bất kì lí do gì khiến bạn không hài lòng.
- Giao hàng toàn quốc. 
- Gửi hàng siêu tốc: Coputa cam kết dịch vụ đóng gói siêu nhanh.

Còn chần chờ gì nữa, hãy nhanh tay đặt mua cho mình những sản phẩm này về tủ đồ của mình nhé!`}</p>
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
              4.9 on 5
            </p>
            <div className="hidden sm:block">
              <StarRated scale={2} />
            </div>
          </div>
          <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-0">
            <div className="w-full h-full flex justify-center items-center">
              <button className="button-theme px-12 py-1">All</button>
            </div>
            {[5, 4, 3, 2, 1].map((val, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full flex justify-center items-center"
                >
                  <button className="border-solid border-slate-300 border-[1px] px-10 py-1">
                    {`${val} star`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* COMMENT ITEMS */}
        <div className="w-full flex flex-col gap-10 py-2">
          {[1, 1, 1, 1, 1].map((val, index) => {
            return <CommentItems key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

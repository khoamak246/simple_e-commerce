import React from "react";
import StarRated from "../card/StarRated";

export default function CommentItems() {
  return (
    <div className="w-full flex gap-2">
      <div className="w-[10%] flex justify-end">
        <img
          src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="w-[90%] flex flex-col text-sm gap-2">
        <div className="w-full flex flex-col gap-1">
          <p>Anh Khoa</p>
          <StarRated scale={1} />
          <p className="text-[#757575]">{`2021-11-12 11:12 | Phân loại hàng: Brown Switch`}</p>
        </div>
        <p>{`Giao hàng nhanh ,1 ngày là giao tới rồi . Đóng gói chắc chắn nhưng vẫn có 1 cái switch bị cong chân nhưng chỉnh lại là được`}</p>
        <div className="w-full lg:w-[50%] grid grid-cols-6 justify-center items-center gap-2">
          {[1, 1, 1, 1, 1, 1].map((val, index) => {
            return (
              <img
                key={index}
                src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
                alt=""
                className="w-full h-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

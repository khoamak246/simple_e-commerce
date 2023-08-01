import React, { useEffect, useState } from "react";
import { handleAnimateToggle, handleDisableOVerflowY } from "../../utils/Utils";
import { useDispatch } from "react-redux";
import { get_relative_busines_by_name } from "../../thunk/BusinessThunk";
import { Link } from "react-router-dom";

export default function SearchModal({ searchValue }) {
  const [isActive, setIsActive] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchValue !== "") {
      handleAnimateToggle(setIsActive);
    } else if (searchValue === "") {
      setIsActive(false);
      handleDisableOVerflowY(false);
    }
  }, [searchValue]);

  useEffect(() => {
    setWaiting(true);
    setData();
    let id = setTimeout(() => {
      dispatch(get_relative_busines_by_name(searchValue)).then((res) => {
        setWaiting(false);
        if (res) {
          return setData(res);
        } else {
          return setData([]);
        }
      });
    }, 300);

    return () => clearTimeout(id);
  }, [searchValue]);

  return (
    <div
      className={`${
        isActive
          ? "max-h-[50vh] border-slate-200 border-solid border-[1px] shadow-lg"
          : "h-0"
      } w-[50%] fixed top-[8vh] left-[20%] bg-white rounded overflow-auto flex flex-col justify-center items-center duration-200 transition-all z-[50]`}
    >
      {!isWaiting &&
        data &&
        data.length !== 0 &&
        data.map((val, index, arr) => {
          return (
            <Link
              to={`/categories/${val.id}`}
              onClick={() => setIsActive(false)}
              key={val.id}
              className={`${
                index !== arr.length - 1 &&
                "border-slate-400 border-solid border-b-[1px]"
              } w-full h-5  cursor-pointer flex items-center pl-2 py-4 hover:bg-slate-100`}
            >
              <p>{val.name}</p>
            </Link>
          );
        })}

      {isWaiting && (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/loadingGif2.gif?alt=media&token=5176c0bc-b8e8-4289-88ff-97b748fcd397"
          alt="loading-envent-img"
          className="h-30 scale-50"
          draggable={false}
        />
      )}
      {!isWaiting && data && data.length === 0 && (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fempty_state.png?alt=media&token=3e8e6738-c13f-48e7-809d-40d425854635"
          alt="loading-envent-img"
          className="w-[50%]"
          draggable={false}
        />
      )}
    </div>
  );
}

import React from "react";
import { SellerDashboardItems } from "../../assets/js/SellerDashboardNavBarItem";
import { Link, useLocation } from "react-router-dom";
import DshTodolist from "./DashboardItems/DshTodolist";
import DshAddproduct from "./DashboardItems/DshAddproduct";
import { useDispatch } from "react-redux";
import { resetSelectBusiness } from "../../redux/reducers/BusinessSlice";

export default function SellerDashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleRenderSubComponent = () => {
    const baseUrl = "/seller/dashboard";
    const matcherUrlComponent = [
      {
        url: "",
        component: <DshTodolist />,
      },
      {
        url: "/productMng/addProduct",
        component: <DshAddproduct />,
      },
    ];
    return matcherUrlComponent.map((val, index) => {
      if (location.pathname === baseUrl + val.url) {
        return (
          <div className="w-full h-full" key={index}>
            {val.component}
          </div>
        );
      }
    });
  };
  return (
    <div className="w-screen h-screen flex mt-2">
      <div className="w-1/5 bg-white border-r-[1px] border-solid border-slate-300 shadow-xl flex flex-col gap-5 p-3">
        {SellerDashboardItems.map((val, index) => {
          return (
            <div className="w-full flex flex-col items-end gap-2" key={index}>
              <div className="w-full flex gap-1">
                {val.icon}
                <p className="font-semibold text-slate-500">{val.tab}</p>
              </div>
              <div className="w-5/6 h-full flex flex-col justify-center gap-1 cursor-pointer">
                {val.subTab.map((subTab, index) => {
                  return (
                    <Link
                      to={`/seller/dashboard/${val.url}/${subTab.url}`}
                      className={`text-sm hover:font-semibold ${
                        location.pathname ===
                        "/seller/dashboard/" + val.url + "/" + subTab.url
                          ? "font-semibold"
                          : ""
                      }`}
                      onClick={() => dispatch(resetSelectBusiness())}
                      key={index}
                    >
                      {subTab.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-4/5 flex justify-end items-center">
        <div className="w-[99%] bg-white h-full shadow-lg">
          {handleRenderSubComponent()}
        </div>
      </div>
    </div>
  );
}

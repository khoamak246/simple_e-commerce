import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OrderItem from "./dshSubItems/OrderItem";
import { useSelector } from "react-redux";
import { SHOP_STATE_SELECTOR } from "../../../redux/selectors/Selectors";
import OrderItemModal from "../../modal/OrderItemModal";
import { sortByIdDESC } from "../../../utils/Utils";

export default function DshAllOrder() {
  const shopSelector = useSelector(SHOP_STATE_SELECTOR);
  const [displayTab, setDisplayTab] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [selectOrderItem, setSelectOrderItem] = useState();
  const location = useLocation();
  const [filterDate, setFilterDate] = useState({
    fromDate: "",
    toDate: "",
  });
  useEffect(() => {
    if (shopSelector) {
      let baseUrl = "/seller/dashboard/orderMng";
      setDisplayTab([
        {
          id: 1,
          tabName: "All order",
          data: shopSelector.orderItems,
          url: baseUrl + "/allOrder",
        },
        {
          id: 2,
          tabName: "Waiting Confirm",
          data: shopSelector.waitingConfirmations,
          url: baseUrl + "/waitingConfirm",
        },
        {
          id: 3,
          tabName: "Waiting Shipper",
          data: shopSelector.goodsWaitingConfirmations,
          url: baseUrl + "/waitingShipper",
        },
        {
          id: 4,
          tabName: "Delevery",
          data: shopSelector.deliveryOrderItems,
          url: baseUrl + "/delivery",
        },
        {
          id: 5,
          tabName: "Done",
          data: shopSelector.doneProcessingOrderItems,
          url: baseUrl + "/doneOrder",
        },
        {
          id: 6,
          tabName: "Cancel",
          data: shopSelector.cancelOrderItems,
          url: baseUrl + "/cancellationForm",
        },
        {
          id: 7,
          tabName: "Return/Refund",
          data: shopSelector.returnOrderItems,
          url: baseUrl + "/return-refund",
        },
      ]);
    }
  }, [shopSelector]);

  useEffect(() => {
    const activeTabArr = [
      {
        url: "/allOrder",
        tab: 0,
      },
      {
        url: "/waitingConfirm",
        tab: 1,
      },
      {
        url: "/waitingShipper",
        tab: 2,
      },
      {
        url: "/delivery",
        tab: 3,
      },
      {
        url: "/doneOrder",
        tab: 4,
      },
      {
        url: "/cancellationForm",
        tab: 5,
      },
      {
        url: "/return-refund",
        tab: 6,
      },
    ];
    let activeTabItem = activeTabArr.find((e) =>
      location.pathname.includes(e.url)
    );
    if (activeTabItem) {
      setActiveTab(activeTabItem.tab);
    }
  }, [location.pathname]);

  const handleFilter = () => {
    if (displayTab) {
      const { fromDate, toDate } = filterDate;
      let fromDateTime = new Date(fromDate).getTime();
      let toDateTime = new Date(toDate).getTime();
      let data = sortByIdDESC([...displayTab[activeTab].data]);
      if (fromDate !== "" && toDate === "") {
        let newData = data.filter((e) => {
          let orderTime = new Date(e.order.createdDate).getTime();
          return fromDateTime <= orderTime;
        });
        return newData;
      } else if (fromDate === "" && toDate !== "") {
        return data.filter((e) => {
          let orderTime = new Date(e.order.createdDate).getTime();
          return orderTime <= toDateTime;
        });
      } else if (fromDate !== "" && toDate !== "") {
        let newData = data.filter((e) => {
          let orderTime = new Date(e.order.createdDate).getTime();
          return fromDateTime <= orderTime && orderTime <= toDateTime;
        });

        return newData;
      } else {
        return data;
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 pb-2">
      <div className="h-[5%] w-full">
        <h1 className="w-full text-xl font-semibold p-2 h-[5%]">All order:</h1>
      </div>
      <div className="pl-2 h-[95%] w-full justify-center items-center">
        <div className="w-[98%] h-[98%] shadow-lg border-solid border-slate-400 border-[1px] flex flex-col">
          {/* NAV */}
          <div className="w-full h-[15%] flex justify-center items-center border-solid border-[#EE4D2D] border-b-[1px]">
            <div className="flex flex-col gap-1 w-[50%]">
              <p className="w-full text-center font-semibold">Date</p>
              <div className="flex gap-2 w-full">
                <div className="w-[49%]">
                  <input
                    name="fromDate"
                    type="date"
                    placeholder="From..."
                    className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                    onChange={(e) =>
                      setFilterDate({ ...filterDate, fromDate: e.target.value })
                    }
                    value={filterDate.fromDate}
                  />
                </div>
                <p className="w-[2%]"> - </p>
                <div className="w-[49%]">
                  <input
                    name="toDate"
                    type="date"
                    placeholder="To..."
                    className="py-1 px-2 w-full border-solid border-[1px] border-slate-400 outline-none rounded-sm text-sm"
                    onChange={(e) =>
                      setFilterDate({ ...filterDate, toDate: e.target.value })
                    }
                    value={filterDate.toDate}
                  />
                </div>
              </div>
              <div className="flex gap-1 justify-center mb-2">
                <button className="bg-orange-300 px-2 rounded w-[30%]">
                  Filter
                </button>
                <button
                  className="bg-slate-300 px-2 rounded w-[30%]"
                  onClick={() =>
                    setFilterDate({
                      fromDate: "",
                      toDate: "",
                    })
                  }
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          {/* TABLE */}
          <div className="w-full h-[85%] flex flex-col justify-center items-center">
            <div className="w-full h-[20%] border-solid border-slate-400 border-b-[1px] flex flex-col gap-1">
              <div className="w-full h-[50%] grid grid-cols-7 border-solid border-[#EE4D2D] border-b-[1px]">
                {displayTab?.map((val, index) => {
                  return (
                    <Link
                      to={val.url}
                      key={index}
                      className={`${
                        activeTab + 1 === val.id &&
                        "bg-[#EE4D2D] text-white font-semibold"
                      } flex justify-center items-center cursor-pointer border-solid border-[#EE4D2D] border-x-[1px] text-[#EE4D2D]`}
                    >
                      {val.tabName}
                    </Link>
                  );
                })}
              </div>
              {/* TABLE HEADER */}

              <div className="w-full h-[50%] grid grid-cols-12 border-solid border-slate-400 border-t-[1px]">
                {[
                  "Order id",
                  "Product id",
                  "Product name",
                  "Option",
                  "Price",
                  "Quantity",
                  "Total",
                  "Payment way",
                  "Created date",
                ].map((val, index, arr) => {
                  if (index !== 2 && index !== 3 && index !== 7) {
                    return (
                      <div
                        key={index}
                        className={`flex justify-center items-center ${
                          index !== arr.length - 1 &&
                          "border-solid border-slate-400 border-r-[1px]"
                        }`}
                      >
                        <p className="text-center">{val}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="col-span-2 flex justify-center items-center border-solid border-slate-400 border-r-[1px]"
                      >
                        <p>{val}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="w-full h-[80%] overflow-auto">
              {displayTab &&
                handleFilter()?.map((val, index) => {
                  return (
                    <div
                      className={`${
                        index % 2 == 0 && "bg-slate-100"
                      } w-full h-auto relative group`}
                      key={val.id}
                    >
                      <div
                        className="absolute top-0 left-0 w-0 h-full group-hover:w-full overflow-hidden duration-300 transition-all bg-orange-200 bg-opacity-50 cursor-pointer"
                        onClick={() => setSelectOrderItem(val)}
                      ></div>
                      <OrderItem orderItem={val} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {selectOrderItem && (
        <OrderItemModal
          orderItem={selectOrderItem}
          closeModal={setSelectOrderItem}
        />
      )}
    </div>
  );
}

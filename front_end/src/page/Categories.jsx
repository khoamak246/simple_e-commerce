import React, { useEffect, useMemo, useState } from "react";
import OptionCheckbox from "../components/categories_page_items/OptionCheckbox";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADDRESS_STATE_SELECTOR } from "../redux/selectors/Selectors";
import {
  get_business_by_id,
  get_categories_product,
} from "../thunk/BusinessThunk";
import { NUMBER_FORMAT_REGEX, validationRegex } from "../utils/Validatation";
import { toast } from "react-hot-toast";
import { resetToggle, setToggle } from "../redux/reducers/ToggleSlice";
import ProductCard from "../components/card/ProductCard";
import { getMinPrice, sortByIdASC } from "../utils/Utils";

export default function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [queryParameters] = useSearchParams();
  const location = useLocation();
  const addressSelector = useSelector(ADDRESS_STATE_SELECTOR);
  const [business, setBusiness] = useState();
  const [searchValue, setSearchValue] = useState([]);
  const [searchPrice, setSearchPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [queryProduct, setQueryProduct] = useState([]);
  const [filterNav, setFilterNav] = useState({
    type: "popular",
    sort: "p-asc",
    page: 1,
  });

  const resetAll = () => {
    setFilterNav({
      type: "popular",
      sort: "p-asc",
      page: 1,
    });

    setSearchPrice({
      minPrice: "",
      maxPrice: "",
    });

    setSearchValue([]);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(get_business_by_id(param.categories)).then((res) => {
      if (res) {
        return setBusiness(res);
      } else {
        navigate("*");
      }
    });
  }, [param]);

  useEffect(() => {
    if (location.search !== "") {
      const pattern =
        /^((buss|minPrice|maxPrice|ra|address)=[0-9]+|keyword=[a-zA-Z]+)$/;
      let locationSearchArr = location.search.slice(1).split("&");
      locationSearchArr.map((e) => {
        if (!pattern.test(e)) {
          return navigate("*");
        }
      });
      locationSearchArr.map((e) => handleOnSelectValue(`&${e}`));
    }
  }, []);

  const handleRenderBusinessObject = useMemo(() => {
    let businessObject = { title: "Categories", option: [] };
    if (business) {
      business.subBusiness.map(
        (e) =>
          (businessObject = {
            ...businessObject,
            option: [
              ...businessObject.option,
              {
                id: e.id,
                optionName: e.name,
                value: `&buss=${e.id}`,
              },
            ],
          })
      );
    }
    businessObject.option.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });
    return businessObject;
  }, [business]);

  const handleRenderAddressObject = useMemo(() => {
    let addressObject = { title: "Address", option: [] };
    if (addressSelector) {
      addressSelector.address.map(
        (e) =>
          (addressObject = {
            ...addressObject,
            option: [
              ...addressObject.option,
              {
                id: e.id,
                optionName: e.name,
                value: `&add=${e.id}`,
              },
            ],
          })
      );
    }
    return addressObject;
  }, [addressSelector]);

  const handleRenderStartRate = useMemo(() => {
    return {
      title: "Rate",
      option: [
        {
          id: 1,
          optionName: "⭐⭐⭐⭐⭐",
          value: `&ra=5`,
        },
        {
          id: 2,
          optionName: "⭐⭐⭐⭐✰",
          value: `&ra=4`,
        },
        {
          id: 3,
          optionName: "⭐⭐⭐✰✰",
          value: `&ra=3`,
        },
        {
          id: 4,
          optionName: "⭐⭐✰✰✰",
          value: `&ra=2`,
        },
      ],
    };
  }, []);

  const handleOnSelectValue = (value) => {
    let newSearchArr = [...searchValue];
    let needToFindValueInArr = value.split("=")[0];
    let index = -1;
    newSearchArr.map((e) => {
      if (e.includes(needToFindValueInArr)) {
        return (index = newSearchArr.indexOf(e));
      }
    });
    if (index >= 0) {
      if (newSearchArr[index] === value) {
        newSearchArr.splice(index, 1);
      } else {
        newSearchArr.splice(index, 1);
        newSearchArr = [...newSearchArr, value];
      }
      setSearchValue(newSearchArr);
    } else {
      setSearchValue([...searchValue, value]);
    }
  };

  const handleNavigate = () => {
    const { minPrice, maxPrice } = searchPrice;
    if (
      (minPrice.length !== 0 &&
        !validationRegex(NUMBER_FORMAT_REGEX, minPrice)) ||
      (maxPrice.length !== 0 && !validationRegex(NUMBER_FORMAT_REGEX, maxPrice))
    ) {
      return toast.error("OOP! Your price not correct!");
    }

    let newUrl = `${location.pathname}`;
    let searchUrl = "";
    searchValue.map((e) => (searchUrl = searchUrl + e));
    if (minPrice !== "") {
      searchUrl = searchUrl + `&minPrice=${minPrice}`;
    }

    if (maxPrice !== "") {
      searchUrl = searchUrl + `&minPrice=${maxPrice}`;
    }
    if (searchUrl !== "") {
      newUrl = newUrl + "?" + searchUrl.slice(1);
    }
    navigate(newUrl);
  };

  useEffect(() => {
    handleNavigate();
  }, [searchValue]);

  useEffect(() => {
    dispatch(setToggle("loading"));
    setFilterNav({
      type: "popular",
      sort: "",
      page: 1,
    });
    let searchName = queryParameters.get("keyword");
    let businessId = Number(param.categories);
    let subBusinessId =
      queryParameters.get("buss") && Number(queryParameters.get("buss"));
    let minPrice =
      queryParameters.get("minPrice") &&
      Number(queryParameters.get("minPrice"));
    let maxPrice =
      queryParameters.get("maxPrice") &&
      Number(queryParameters.get("maxPrice"));
    let rate = queryParameters.get("ra") && Number(queryParameters.get("ra"));
    let provinceCityId =
      queryParameters.get("add") && Number(queryParameters.get("add"));

    dispatch(
      get_categories_product({
        searchName,
        businessId,
        subBusinessId,
        minPrice,
        maxPrice,
        rate,
        provinceCityId,
      })
    ).then((res) => {
      dispatch(resetToggle());
      if (res) {
        setQueryProduct(res);
      } else {
        // navigate("*");
      }
    });
  }, [queryParameters]);

  const handleRenderProduct = useMemo(() => {
    let renderProductArr = [...sortByIdASC(queryProduct)];
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
        (filterNav.page - 1) * 30 <= renderProductArr.indexOf(e) &&
        renderProductArr.indexOf(e) < (filterNav.page - 1) * 30 + 30
    );
    return result;
  }, [queryProduct, filterNav]);

  const handleTotalPage = () => {
    let displayProductLength = handleRenderProduct.length;
    let totalPage = 1;

    if (displayProductLength % 25 !== 0) {
      totalPage =
        totalPage + ((displayProductLength - (displayProductLength % 25)) % 25);
    }

    return totalPage;
  };

  return (
    <div className="w-screen mt-5 grid grid-cols-5">
      <div className="col-span-1 flex flex-col px-8">
        <div className="w-full flex items-center gap-2">
          <div>
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
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Filter</h2>
        </div>
        {/* BUSINESS */}
        <OptionCheckbox
          data={handleRenderBusinessObject}
          selectValue={handleOnSelectValue}
        />
        {/* ADDRESS */}
        <OptionCheckbox
          data={handleRenderAddressObject}
          selectValue={handleOnSelectValue}
        />
        {/* PRICE */}
        <div className="w-full flex flex-col py-6 text-sm gap-3 border-slate-400 border-b-[1px] border-solid">
          <h2>Price</h2>
          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              placeholder="From..."
              className="py-1 px-2 outline-none text-sm border-[1px] border-slate-400 border-solid rounded"
              value={searchPrice.minPrice}
              onChange={(e) =>
                setSearchPrice({ ...searchPrice, minPrice: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="To..."
              className="py-1 px-2 outline-none text-sm border-[1px] border-slate-400 border-solid rounded"
              value={searchPrice.maxPrice}
              onChange={(e) =>
                setSearchPrice({ ...searchPrice, maxPrice: e.target.value })
              }
            />
            <button
              className="bg-[#EE4D2D] text-white py-2 rounded"
              onClick={handleNavigate}
            >
              confirm
            </button>
          </div>
        </div>
        {/* RATE */}
        <OptionCheckbox
          data={handleRenderStartRate}
          selectValue={handleOnSelectValue}
        />
        <button
          className="bg-[#EE4D2D] text-white py-2 rounded mt-2"
          onClick={() => resetAll()}
        >
          Reset all
        </button>
      </div>
      {/* SORT */}
      <div className="col-span-4 bg-[#FCFCFC] flex flex-col">
        <div className="w-full h-[8%] bg-[#EDEDED] flex items-center px-5 gap-2">
          <p className="w-[10%]">Sort by: </p>
          {/* POPULAR */}
          <button
            className={`${
              filterNav.type === "popular"
                ? "bg-[#EE4D2D] text-white"
                : "bg-white border-[1px] border-slate-400 border-solid"
            } w-[10%] py-1 rounded`}
            onClick={() => setFilterNav({ ...filterNav, type: "popular" })}
            disabled={filterNav.type === "popular"}
          >
            Popular
          </button>
          {/* BEST-SELLER */}
          <button
            className={`${
              filterNav.type === "bestSeller"
                ? "bg-[#EE4D2D] text-white"
                : "bg-white border-[1px] border-slate-400 border-solid"
            } w-[10%] py-1 rounded`}
            onClick={() => setFilterNav({ ...filterNav, type: "bestSeller" })}
            disabled={filterNav.type === "bestSeller"}
          >
            Best seller
          </button>
          {/* PRICE */}
          <select
            name=""
            className="w-[20%] py-1 rounded border-[1px] border-slate-400 border-solid cursor-pointer outline-none  "
            value={filterNav.sort}
            onChange={(e) =>
              setFilterNav({ ...filterNav, sort: e.target.value })
            }
          >
            <option value="p-asc">Price ASC</option>
            <option value="p-desc">Price DESC</option>
          </select>
          {/* PAGE */}
          <div className="w-[42%] flex justify-end items-center">
            <p className="mr-2">
              {filterNav.page}/{handleTotalPage()}
            </p>
            <button
              className={`${
                filterNav.page === 1
                  ? " bg-slate-50 text-slate-400"
                  : "text-black bg-white"
              } rounded-l flex items-center justify-center border-r-[1px] border-slate-300 border-solid  `}
              disabled={filterNav.page === 1}
              onClick={() =>
                setFilterNav({
                  ...filterNav,
                  page: filterNav.page - 1,
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.0}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className={` ${
                filterNav.page === handleTotalPage()
                  ? " bg-slate-50 text-slate-400"
                  : "text-black bg-white"
              } rounded-r flex items-center justify-center`}
              onClick={() =>
                setFilterNav({
                  ...filterNav,
                  page: filterNav.page + 1,
                })
              }
              disabled={filterNav.page === handleTotalPage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.0}
                stroke="currentColor"
                className="w-6 h-6"
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
        {/* PRODUCT  */}
        {handleRenderProduct.length == 0 ? (
          <div className="w-full h-[92%] flex justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/page_img%2FsellerPage%2Fempty_state.png?alt=media&token=3e8e6738-c13f-48e7-809d-40d425854635"
              alt=""
              className="w-[50%]"
            />
          </div>
        ) : (
          <div className="h-[92%] w-full p-2 grid grid-cols-5 grid-rows-3 gap-2 gap-y-5">
            {handleRenderProduct.map((val, index) => {
              return <ProductCard key={val.id} product={val} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

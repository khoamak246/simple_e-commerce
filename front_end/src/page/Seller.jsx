import React, { useEffect } from "react";
import Introduce from "../components/seller_page_items/Introduce";
import SellerRegisterForm from "../components/seller_page_items/SellerRegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { get_shop_by_user_id } from "../thunk/ShopThunk";
import { resetToggle, setToggle } from "../redux/reducers/ToggleSlice";
import { AUTH_STATE_SELECTOR } from "../redux/selectors/Selectors";
import { useLocation, useNavigate } from "react-router-dom";
import SellerDashboard from "../components/seller_page_items/SellerDashBoard";

export default function Seller() {
  const dispatch = useDispatch();
  const authSelector = useSelector(AUTH_STATE_SELECTOR);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!authSelector) {
      navigate("/");
    } else {
      dispatch(setToggle("loading"));
      dispatch(get_shop_by_user_id()).then((res) => {
        if (res) {
          navigate("/seller/dashboard");
        }
        dispatch(resetToggle());
      });
    }
  }, []);

  return (
    <>
      {location.pathname.match("/seller/introduce") ? (
        <Introduce />
      ) : location.pathname.match("/seller/register") ? (
        <SellerRegisterForm />
      ) : location.pathname.match("/seller/dashboard/*") ? (
        <SellerDashboard />
      ) : (
        ""
      )}
    </>
  );
}

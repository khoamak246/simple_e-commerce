import React, { useEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Home from "../Home";
import Login_Register from "../Login_Register";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_STATE_SELECTOR,
  TOGGLE_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import { useCookies } from "react-cookie";
import { post_login } from "../../thunk/AuthThunk";
import { page_title } from "../../assets/js/Pagetitle";
import Navbar from "../../components/navbar_footer/Navbar";
import Footer from "../../components/navbar_footer/Footer";
import Profile from "../Profile";
import Seller from "../Seller";
import LoadingEvent from "../../components/loadingEvent/LoadingEvent";
import { get_address } from "../../thunk/AddressThunk";
import AddressSelectModal from "../../components/modal/AddressSelectModal";
import { SellerDashboardItems } from "../../assets/js/SellerDashboardNavBarItem";
import { get_business } from "../../thunk/BusinessThunk";
import ShopDetail from "../ShopDetail";
import ProductDetail from "../ProductDetail";
import Cart from "../Cart";
import Chat from "../../components/chat/Chat";
import UnknowPage from "../UnknowPage";

export default function Router() {
  const dispatch = useDispatch();
  const authentication = useSelector(AUTH_STATE_SELECTOR);
  const [cookies, setCookies] = useCookies();
  const location = useLocation();
  const toggleSelector = useSelector(TOGGLE_STATE_SELECTOR);

  useEffect(() => {
    let title = "EON";
    page_title.forEach((element) => {
      if (location.pathname.includes(element.pathname)) {
        title = title + ` - ${element.title}`;
      }
    });
    document.title = title;
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!authentication) {
      if (cookies.username && cookies.password) {
        const { username, password } = cookies;
        let inputLoginForm = {
          username,
          password,
        };
        dispatch(post_login(inputLoginForm)).then((res) => {
          if (res) {
            let usernameAndPasswordCookieExpired = Date.now() + 604800000;
            setCookies("token", res.token, {
              path: "/",
              maxAge: res.expiredTime,
            });
            setCookies("username", inputLoginForm.username, {
              path: "/",
              maxAge: usernameAndPasswordCookieExpired,
            });
            setCookies("password", inputLoginForm.password, {
              path: "/",
              maxAge: usernameAndPasswordCookieExpired,
            });
          }
        });
      }
    }

    dispatch(get_address());
    dispatch(get_business());
  }, []);

  return (
    <>
      <Navbar />
      {toggleSelector === "loading" && <LoadingEvent />}
      {toggleSelector === "selectAddress" && <AddressSelectModal />}

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/seller/introduce" Component={Seller} />
        <Route path="/seller/register" Component={Seller} />
        <Route path="/seller/dashboard" Component={Seller}>
          {SellerDashboardItems.map((val, index) => {
            return (
              <Route path={val.url} Component={Seller} key={index}>
                {val.subTab.map((subTab, index) => {
                  return (
                    <Route path={subTab.url} Component={Seller} key={index} />
                  );
                })}
              </Route>
            );
          })}
        </Route>
        <Route path="/shop/detail/:shopId" Component={ShopDetail} />
        <Route path="/categories/:categories" Component={ShopDetail} />
        <Route path="/product/detail/:productId" Component={ProductDetail} />
        <Route path="/cart/detail" Component={Cart} />
        <Route path="/login" Component={Login_Register} />
        <Route path="/register" Component={Login_Register} />
        <Route path="*" Component={UnknowPage} />
      </Routes>
      <Footer />
      <Chat />
    </>
  );
}

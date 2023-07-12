import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { post_login } from "../../thunk/AuthThunk";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

export default function Login_Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggle, setToggle] = useState(false);
  const [inputLoginForm, setInputLoginForm] = useState({
    username: "",
    password: "",
  });
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  }, []);

  const handleOnChangeLoginForm = (e) => {
    const { id, value } = e.target;
    setInputLoginForm({ ...inputLoginForm, [id]: value });
  };

  const handleOnSubmitLoginForm = () => {
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
        toast.success(`Welcome! ${res.user.fullName}`);
        navigate("/");
      } else {
        toast.error("OOP! Wrong usename or password!", { duration: 2000 });
      }
    });
  };
  return (
    <div
      className="w-[90%] h-[90%] flex flex-col justify-start"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOnSubmitLoginForm();
        }
      }}
    >
      <div
        className={`${
          isToggle ? "w-full" : "w-0"
        } h-full duration-200 transition-all overflow-hidden`}
      >
        <div className="h-[10%] flex items-center">
          <p className="text-xl font-sans">Login</p>
        </div>
        <div className=" h-[90%] flex flex-col justify-evenly">
          <input
            id="username"
            type="text"
            className="w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] focus:border-black shadow-md"
            placeholder="Email/Phone number/Username"
            onChange={handleOnChangeLoginForm}
            value={inputLoginForm.username}
          />
          <input
            id="password"
            type="password"
            className="w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] focus:border-black shadow-md"
            placeholder="Password"
            onChange={handleOnChangeLoginForm}
            value={inputLoginForm.password}
          />
          <button
            className="bg-orange-300 w-full py-2 rounded-sm"
            onClick={handleOnSubmitLoginForm}
          >
            Login
          </button>
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center text-sm text-neutral-300">OR</p>
          </div>
          <div className="w-full flex gap-3 justify-center items-center">
            <div className="gap-1 md:gap-2 border-solid border-[1px] border-black w-[40%] flex justify-center items-center py-2 px-6 rounded-sm cursor-pointer">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/fb_icon.png?alt=media&token=4cf9fff9-c634-45fc-9c0f-b2d47585cac1"
                alt="facebook-icon"
                className="w-4 h-4 md:w-6 md:h-6"
              />
              <p className="text-sm">Facebook</p>
            </div>
            <div className="gap-1 md:gap-2 border-solid border-[1px] border-black w-[40%] flex justify-center items-center py-2 px-6 rounded-sm cursor-pointer">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/google_icon.png?alt=media&token=1699a560-60ee-4603-bcc3-0f6b3759f9a8"
                alt="facebook-icon"
                className="w-4 h-4 md:w-6 md:h-6"
              />
              <p className="text-sm">Google</p>
            </div>
          </div>
          <div className="flex gap-1 justify-center">
            <p className="text-sm text-[#C6BDBD]">Do not have an account?</p>
            <Link to={"/register"} className="text-[#F3826C] text-sm">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

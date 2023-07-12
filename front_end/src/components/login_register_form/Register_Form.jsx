import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as validation from "../../utils/Validatation";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { POST_REGISTER } from "../../api/service/AuthService";
import { post_register } from "../../thunk/AuthThunk";

export default function Register_Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggle, setToggle] = useState(false);
  const [inputRegisterForm, setInputRegisterForm] = useState({
    fullName: {
      pattern: validation.FULL_NAME_REGEX,
      value: "",
      isValid: null,
    },
    username: {
      pattern: validation.USER_NAME_REGEX,
      value: "",
      isValid: null,
    },
    password: {
      pattern: validation.PASSWORD_REGEX,
      value: "",
      isValid: null,
    },
    phoneNumber: {
      pattern: validation.PHONE_NUMBER_REGEX,
      value: "",
      isValid: null,
    },
    email: {
      pattern: validation.EMAIL_REGEX,
      value: "",
      isValid: null,
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  }, []);

  const handleOnChangeRegisterForm = (e) => {
    const { id, value } = e.target;

    setInputRegisterForm({
      ...inputRegisterForm,
      [id]: {
        ...inputRegisterForm[id],
        value,
        isValid: validation.validationRegex(
          inputRegisterForm[id].pattern,
          value
        ),
      },
    });
  };

  const isInputFormErrorState = (feild) => {
    let check = true;
    let isValidInputTerm = inputRegisterForm[feild].isValid;
    if (isValidInputTerm !== null && !isValidInputTerm) {
      check = false;
    }
    return check;
  };

  const handleRegister = () => {
    let registerForm = {
      fullName: "",
      username: "",
      password: "",
      phoneNumber: "",
      email: "",
    };
    for (const key in inputRegisterForm) {
      if (!inputRegisterForm[key].isValid) {
        toast.error("OOP! Something wrong! Please check again!", {
          duration: 2000,
        });
        return;
      } else {
        registerForm = { ...registerForm, [key]: inputRegisterForm[key].value };
      }
    }

    dispatch(post_register(registerForm)).then((res) => {
      if (res !== true) {
        toast.error(`${res}`, {
          duration: 2000,
        });
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <div
      className="w-[90%] h-[90%] flex flex-col justify-start"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleRegister();
        }
      }}
    >
      <div
        className={`${
          isToggle ? "w-full" : "w-0"
        } h-full duration-200 transition-all overflow-hidden`}
      >
        <div className="h-[10%] flex items-center">
          <p className="text-xl font-sans">Register</p>
        </div>
        <div className=" h-[90%] flex flex-col justify-evenly">
          {/* Full Name Input */}
          <input
            id="fullName"
            type="text"
            className={`w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] shadow-md ${
              isInputFormErrorState("fullName")
                ? "focus:border-black"
                : "border-red-400"
            }`}
            placeholder="Full name"
            maxLength={50}
            value={inputRegisterForm.fullName.value}
            onChange={handleOnChangeRegisterForm}
          />
          <p
            className={`text-[0.7rem] text-red-400 text-center ${
              isInputFormErrorState("fullName") ? "hidden" : ""
            }`}
          >
            {validation.ERROR_FULL_NAME_MESS}
          </p>

          {/* Username Input */}
          <input
            id="username"
            type="text"
            className={`w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] shadow-md ${
              isInputFormErrorState("username")
                ? "focus:border-black"
                : "border-red-400"
            }`}
            placeholder="Username"
            maxLength={30}
            onChange={handleOnChangeRegisterForm}
            value={inputRegisterForm.username.value}
          />
          <p
            className={`text-[0.7rem] text-red-400 text-center ${
              isInputFormErrorState("username") ? "hidden" : ""
            }`}
          >
            {validation.ERROR_USER_NAME_RESS}
          </p>

          {/* Email Input */}
          <input
            id="email"
            type="text"
            className={`w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] shadow-md ${
              isInputFormErrorState("email")
                ? "focus:border-black"
                : "border-red-400"
            }`}
            placeholder="Email"
            onChange={handleOnChangeRegisterForm}
            value={inputRegisterForm.email.value}
          />
          <p
            className={`text-[0.7rem] text-red-400 text-center ${
              isInputFormErrorState("email") ? "hidden" : ""
            }`}
          >
            {validation.ERROR_EMAIL_MESS}
          </p>

          {/* Phone Number Input */}
          <input
            id="phoneNumber"
            type="text"
            className={`w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] shadow-md ${
              isInputFormErrorState("phoneNumber")
                ? "focus:border-black"
                : "border-red-400"
            }`}
            placeholder="Phone number"
            maxLength={10}
            onChange={handleOnChangeRegisterForm}
            value={inputRegisterForm.phoneNumber.value}
          />
          <p
            className={`text-[0.7rem] text-red-400 text-center ${
              isInputFormErrorState("phoneNumber") ? "hidden" : ""
            }`}
          >
            {validation.ERROR_PHONE_NUMBER_MESS}
          </p>

          {/* Password Input */}
          <input
            id="password"
            type="text"
            className={`w-full h-[8%] rounded-sm outline-1 text-sm px-2 py-5 outline-none border-[#DDDDDD] border-[1px] shadow-md ${
              isInputFormErrorState("password")
                ? "focus:border-black"
                : "border-red-400"
            }`}
            placeholder="Password"
            onChange={handleOnChangeRegisterForm}
            value={inputRegisterForm.password.value}
          />
          <p
            className={`text-[0.7rem] text-red-400 text-center ${
              isInputFormErrorState("password") ? "hidden" : ""
            }`}
          >
            {validation.ERROR_PASSWORD_MESS}
          </p>

          <button
            className="bg-orange-300 w-full py-2 rounded-sm"
            onClick={handleRegister}
          >
            Register
          </button>
          <div className="flex gap-1 justify-center">
            <p className="text-sm text-[#C6BDBD]">Already have account?</p>
            <Link to={"/login"} className="text-[#F3826C] text-sm">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

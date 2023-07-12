import React from "react";
import { Link, useLocation } from "react-router-dom";
import Login_Form from "../components/login_register_form/Login_Form";
import Register_Form from "../components/login_register_form/Register_Form";

export default function Login_Register() {
  const location = useLocation();

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden fixed top-0 left-0 flex flex-col items-center bg-[url('https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/login_register%20background.jpg?alt=media&token=50c6788c-c9cd-4966-9430-1fb3b201a9f5')] bg-cover bg-no-repeat">
      <div className="backdrop-blur-md bg-white/30 h-[10%] w-full flex items-center justify-between px-3">
        <Link to={"/"}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/Logo-no-bg.png?alt=media&token=b44f9a8f-8ca5-4392-8859-6cc5af37f3fc"
            alt="register-login-nav-logo"
            draggable={false}
            className="h-[10vh] cursor-pointer"
          />
        </Link>
        <div className="flex gap-1">
          <p className="font-sans text-sm cursor-default">
            Make your life easier
          </p>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/Heart-icon-no-bg.png?alt=media&token=30fe8dd9-59a3-4782-95f1-4d4da56be2fd"
            alt="heart-icon-register-login-navbar-logo"
            className="w-6 h-6"
            draggable={false}
          />
        </div>
      </div>
      <div className=" w-full h-[90%] flex justify-center md:justify-end items-center">
        <div className="w-full sm:w-[50%] h-full flex justify-center items-center">
          <div className="bg-white sm:rounded-lg w-full h-full lg:w-[60%] md:w-[80%] sm:w-[90%] sm:h-[80%] flex justify-center items-center">
            {location.pathname === "/login" ? (
              <Login_Form />
            ) : (
              <Register_Form />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

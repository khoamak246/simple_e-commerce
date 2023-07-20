import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import * as validation from "../../utils/Validatation";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { patch_update_user } from "../../thunk/UserThunk";
import { handle_log_out } from "../../thunk/AuthThunk";
import { useNavigate } from "react-router-dom";

export default function Password() {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const [inputPassword, setInputPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const resetInputPassword = () => {
    setInputPassword({
      currentPassword: "",
      newPassword: "",
    });
  };

  const handleOnChangeInputPassword = (e) => {
    const { name, value } = e.target;
    setInputPassword({ ...inputPassword, [name]: value });
  };
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);

  const handleOnSubmit = () => {
    const { currentPassword, newPassword } = inputPassword;
    if (
      !validation.validationRegex(validation.PASSWORD_REGEX, currentPassword) ||
      !validation.validationRegex(validation.PASSWORD_REGEX, newPassword)
    ) {
      toast.error(validation.ERROR_PASSWORD_MESS);
    } else if (currentPassword === newPassword) {
      toast.error(
        "OOP! Your current password and new password can not be the same!"
      );
    } else if (currentPassword !== cookies.password) {
      toast.error("OOP! Your current password not correct!");
    } else {
      dispatch(patch_update_user(inputPassword)).then((res) => {
        if (res) {
          toast.success("Update successfully!", { duration: 2000 });
          dispatch(handle_log_out()).then((res) => {
            if (res) {
              navigate("/login");
            }
          });
        }
      });
    }
  };

  return (
    <div
      className={`${
        isActive ? "w-[95%]" : "w-0"
      }  h-[95%] flex flex-col gap-5 duration-200 transition-all overflow-hidden`}
    >
      <div className="w-full flex flex-col gap-5">
        <p className="font-semibold underline">PASSWORD:</p>
        {/* Current password */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Current password:</h2>
          <input
            name="currentPassword"
            type="text"
            placeholder="Current password..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputPassword.currentPassword}
            onChange={handleOnChangeInputPassword}
          />
        </div>

        {/* New password */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">New password:</h2>
          <input
            name="newPassword"
            type="text"
            placeholder="New password..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputPassword.newPassword}
            onChange={handleOnChangeInputPassword}
          />
        </div>
      </div>
      {/* Button */}
      <div className="flex w-full gap-3">
        <button
          className="bg-orange-200 py-1 px-6 rounded-2xl hover:scale-95 duration-200 transition-all"
          onClick={handleOnSubmit}
        >
          Save
        </button>
        <button className="bg-slate-300 py-1 px-6 rounded-2xl hover:scale-95 duration-200 transition-all">
          Reset
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_STATE_SELECTOR } from "../../redux/selectors/Selectors";
import * as validation from "../../utils/Validatation";
import { toast } from "react-hot-toast";
import { patch_update_user } from "../../thunk/UserThunk";

export default function Personal() {
  const currentUserAuth = useSelector(USER_STATE_SELECTOR);
  const [isActive, setActive] = useState(false);
  const [inputPersonalForm, setInputPersonaForm] = useState();
  const dispatch = useDispatch();

  const setValueCurrentUserToForm = () => {
    if (currentUserAuth) {
      setInputPersonaForm({
        fullName: currentUserAuth.fullName,
        email: currentUserAuth.email,
        phoneNumber: currentUserAuth.phoneNumber,
        gender: currentUserAuth.userInfo.gender,
        dateOfBirth: currentUserAuth.userInfo.dateOfBirth,
      });
    }
  };

  useEffect(() => {
    if (currentUserAuth) {
      setValueCurrentUserToForm();
    }
  }, [currentUserAuth]);

  const handleLimitInputBirthDay = () => {
    let currentDateArr = new Date().toISOString().split("T")[0].split("-");
    let year = Number(currentDateArr[0] - 3);
    let mounth = currentDateArr[1];
    let day = currentDateArr[2];
    return `${year}-${mounth}-${day}`;
  };

  const handleOnChangeInputPersonalForm = (e) => {
    if (currentUserAuth && inputPersonalForm) {
      const { name, value } = e.target;
      if (name === "gender") {
        setInputPersonaForm({
          ...inputPersonalForm,
          [name]: value === "none" ? null : value === "true",
        });
      } else {
        setInputPersonaForm({ ...inputPersonalForm, [name]: value });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
  }, []);

  const handleOnSubmit = () => {
    if (inputPersonalForm) {
      const { fullName, email, phoneNumber } = inputPersonalForm;

      if (!validation.validationRegex(validation.FULL_NAME_REGEX, fullName)) {
        return toast.error(validation.ERROR_FULL_NAME_MESS);
      }
      if (!validation.validationRegex(validation.EMAIL_REGEX, email)) {
        return toast.error(validation.ERROR_EMAIL_MESS);
      }
      if (
        !validation.validationRegex(validation.PHONE_NUMBER_REGEX, phoneNumber)
      ) {
        return toast.error(validation.ERROR_PHONE_NUMBER_MESS);
      }
      dispatch(patch_update_user(inputPersonalForm)).then((res) => {
        if (res) {
          toast.success("Update successfully!", { duration: 2000 });
        }
      });
    }
  };

  return (
    <div
      className={`${
        isActive ? "w-[95%]" : "w-0"
      }  h-[95%] flex flex-col justify-around duration-200 transition-all overflow-hidden`}
    >
      <div className="w-full flex flex-col gap-5">
        <p className="font-semibold underline">PERSONAL:</p>
        {/* Full Name */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Full name:</h2>
          <input
            name="fullName"
            type="text"
            placeholder="Full name..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputPersonalForm ? inputPersonalForm.fullName : ""}
            onChange={handleOnChangeInputPersonalForm}
          />
        </div>
        {/* Email */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Email:</h2>
          <input
            name="email"
            type="text"
            placeholder="Email..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputPersonalForm ? inputPersonalForm.email : ""}
            onChange={handleOnChangeInputPersonalForm}
          />
        </div>
        {/* Phone Number */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Phone number:</h2>
          <input
            name="phoneNumber"
            type="text"
            maxLength={10}
            placeholder="Phone number..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputPersonalForm ? inputPersonalForm.phoneNumber : ""}
            onChange={handleOnChangeInputPersonalForm}
          />
        </div>

        {/* Gender */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Gender:</h2>
          <div className="flex items-center gap-8">
            <div className="flex gap-1">
              <input
                name="gender"
                type="radio"
                value={"none"}
                checked={
                  inputPersonalForm ? inputPersonalForm.gender === null : false
                }
                onChange={handleOnChangeInputPersonalForm}
              />
              <p>None</p>
            </div>
            <div className="flex gap-1">
              <input
                name="gender"
                type="radio"
                value={false}
                checked={
                  inputPersonalForm ? inputPersonalForm.gender == false : false
                }
                onChange={handleOnChangeInputPersonalForm}
              />
              <p>Female</p>
            </div>
            <div className="flex gap-1">
              <input
                name="gender"
                type="radio"
                value={true}
                checked={
                  inputPersonalForm ? inputPersonalForm.gender == true : false
                }
                onChange={handleOnChangeInputPersonalForm}
              />
              <p>Male</p>
            </div>
          </div>
        </div>

        {/* DateOfBirth */}
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-semibold">Date of birth:</h2>
          <input
            name="dateOfBirth"
            type="date"
            placeholder="Phone number..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={
              inputPersonalForm
                ? inputPersonalForm.dateOfBirth !== null
                  ? inputPersonalForm.dateOfBirth
                  : ""
                : ""
            }
            onChange={handleOnChangeInputPersonalForm}
            max={handleLimitInputBirthDay()}
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
        <button
          className="bg-slate-300 py-1 px-6 rounded-2xl hover:scale-95 duration-200 transition-all"
          onClick={setValueCurrentUserToForm}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

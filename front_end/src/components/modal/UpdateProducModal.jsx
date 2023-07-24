import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handleRenderBusiness } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  patch_update_product,
  patch_update_product_option,
} from "../../thunk/ProductThunk";
import { toast } from "react-hot-toast";
import { resetAddress } from "../../redux/reducers/AddressSlice";
import { resetSelectBusiness } from "../../redux/reducers/BusinessSlice";
import { setToggle } from "../../redux/reducers/ToggleSlice";
import SelectBusinessModal from "./SelectBusinessModal";

export default function UpdateProducModal({
  editType,
  closeModal,
  editItem,
  setEditItem,
}) {
  const [isActive, setAcvtive] = useState(false);
  const [inputUpdate, setInputUpdate] = useState();
  const dispatch = useDispatch();
  const [isToggleSelectBusinessModal, setToggleSelctBusinessModal] =
    useState(false);

  useEffect(() => {
    if (editType === "option" && editItem) {
      const { name, price, stock } = editItem;
      setInputUpdate({
        name,
        price,
        stock,
      });
    } else if (editType === "product" && editItem) {

      const { name, business, onSale, description } = editItem;

      setInputUpdate({
        name,
        business,
        onSale,
        description,
      });
    }
  }, [editItem, editType]);
  useEffect(() => {
    setTimeout(() => {
      setAcvtive(true);
    }, 50);
  }, []);

  const selectBusiness = (business) => {
    setInputUpdate({ ...inputUpdate, business });
  };

  const renderProductEdit = () => {
    return (
      <>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Name:</h2>
          <input
            name="name"
            type="text"
            placeholder="Name..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputUpdate ? inputUpdate.name : ""}
            onChange={onChangeInputUpdate}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Business:</h2>
          <div
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1  cursor-pointer"
            onClick={() => {
              dispatch(resetSelectBusiness());
              setToggleSelctBusinessModal(true);
            }}
          >
            <p>
              {inputUpdate ? handleRenderBusiness(inputUpdate.business) : ""}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Stock:</h2>
          <select
            name="onSale"
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            onChange={onChangeInputUpdate}
          >
            <option value="true" selected={inputUpdate && inputUpdate.onSale}>
              Sale
            </option>
            <option value="false" selected={inputUpdate && !inputUpdate.onSale}>
              Not sale
            </option>
          </select>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Stock:</h2>
          <textarea
            name="description"
            cols="30"
            rows="4"
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputUpdate ? inputUpdate.description : ""}
            onChange={onChangeInputUpdate}
            maxLength={3000}
          ></textarea>
        </div>
      </>
    );
  };

  const renderOptionEdit = () => {
    return (
      <>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Name:</h2>
          <input
            name="name"
            type="text"
            placeholder="Name..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputUpdate ? inputUpdate.name : ""}
            onChange={onChangeInputUpdate}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Price:</h2>
          <input
            name="price"
            type="text"
            placeholder="price..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputUpdate ? inputUpdate.price : ""}
            onChange={onChangeInputUpdate}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h2 className="font-semibold w-[60%]">Stock:</h2>
          <input
            name="stock"
            type="number"
            placeholder="Stock..."
            className="w-[60%] borde-solid border-[1px] border-slate-500 rounded-sm px-2 py-1"
            value={inputUpdate ? inputUpdate.stock : 0}
            onChange={onChangeInputUpdate}
          />
        </div>
      </>
    );
  };

  const handleCloseModal = () => {
    setAcvtive(false);
    setEditItem();
    dispatch(resetSelectBusiness());
    setTimeout(() => {
      closeModal("");
    }, 400);
  };

  const onChangeInputUpdate = (e) => {
    if (inputUpdate) {
      const { name, value } = e.target;
      if (name == "onSale") {
        setInputUpdate({ ...inputUpdate, [name]: value === "true" });
      } else {
        setInputUpdate({ ...inputUpdate, [name]: value });
      }
    }
  };

  const handleOnSubmit = () => {
    for (const key in inputUpdate) {
      if (inputUpdate[key] === "" || inputUpdate[key] === null) {
        toast.error("OOP! You forgot something please check again!");
      }
    }

    if (editType === "option") {
      dispatch(
        patch_update_product_option({
          productOptionId: editItem.id,
          updateProductOptionForm: inputUpdate,
        })
      ).then((res) => {
        if (res) {
          toast.success("Update successfully!");
          handleCloseModal();
        }
      });
    } else {
      const { name, business, onSale, description } = inputUpdate;
      dispatch(
        patch_update_product({
          productId: editItem.id,
          updateProductForm: {
            name,
            description,
            onSale,
            businessId: business.id,
          },
        })
      ).then((res) => {
        if (res) {
          toast.success("Update successfully!");
          handleCloseModal();
        }
      });
    }
  };

  return (
    <div
      className={`${
        isActive ? "w-full h-full" : "w-0 h-0"
      } fixed top-0 left-0 z-[50] flex justify-center items-center bg-black bg-opacity-50 overflow-hidden duration-300 transition-all`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOnSubmit();
        }
      }}
    >
      <div className="w-[50%] h-[80%] bg-white shadow-xl border-[1px] border-slate-300 border-solid rounded-md flex flex-col items-center justify-center gap-5 relative">
        <button
          className="absolute top-[5%] right-[5%]"
          onClick={handleCloseModal}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="text-xl font-semibold">{`Edit ${editType}`}</p>
        {editType === "option" ? renderOptionEdit() : renderProductEdit()}
        <button
          className="bg-orange-300 w-[25%] rounded-md py-1 px-3 font-semibold text-white"
          onClick={handleOnSubmit}
        >
          Save
        </button>
      </div>
      {isToggleSelectBusinessModal && (
        <SelectBusinessModal
          toggleModal={setToggleSelctBusinessModal}
          selectBusinessMethod={selectBusiness}
        />
      )}
    </div>
  );
}

import React from "react";

export default function AddressItem({
  address,
  selectAddress,
  setSelectAddress,
}) {
  return (
    <div className="w-full flex border-solid border-[1px] border-red-300 py-2 px-3 rounded-lg items-center justify-between">
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 fill-red-500"
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>

        <div>
          {address && (
            <>
              <p>{`${address.ward.name} - ${address.district.name} - ${address.provinceCity.name}`}</p>
              <p className="text-sm">{address.streetDetail}</p>
            </>
          )}
        </div>
      </div>
      <div>
        {address &&
          selectAddress &&
          setSelectAddress(
            <input
              type="radio"
              className="accent-red-500"
              checked={address.id === selectAddress.id}
              onChange={() => setSelectAddress(address.id)}
            />
          )}
      </div>
    </div>
  );
}

import React from "react";

export default function Footer() {
  return (
    <div className="w-screen mt-10">
      <div className="bg-[#232F3E] w-full">
        <div
          className="w-full bg-[#485769] h-[6vh] flex justify-center items-center cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <p className="text-white font-semibold">Back to top</p>
        </div>
        <div className="flex justify-evenly w-full py-5">
          <div className="w-[90%] flex justify-center">
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-white font-semibold mb-2">Get to Know Us</h1>
              <p className="text-white text-sm">EON product</p>
              <p className="text-white text-sm">EON kitchen</p>
              <p className="text-white text-sm">EON beauty</p>
              <p className="text-white text-sm">EON gaming</p>
              <p className="text-white text-sm">EON book</p>
              <p className="text-white text-sm">About EON</p>
            </div>
          </div>
          <div className="w-[90%] flex justify-center">
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-white font-semibold mb-2">
                Make Money with Us
              </h1>
              <p className="text-white text-sm">Sell products on EON</p>
              <p className="text-white text-sm">About EON Business</p>
            </div>
          </div>
          <div className="w-[90%] flex justify-center">
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-white font-semibold mb-2">Let Us Help You</h1>
              <p className="text-white text-sm">Contact</p>
              <p className="text-white text-sm">Your acount</p>
            </div>
          </div>
          <div className="w-[90%] flex justify-center">
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-white font-semibold mb-2">Address</h1>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.107493483768!2d105.79705617444834!3d20.98832778065088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc74d0c662b%3A0x1c5d6cb2f556eb7e!2zVMOyYSBuaMOgIFPDtG5nIMSQw6AsIE5ndXnhu4VuIFRyw6NpLCBUaGFuaCBYdcOibiBOYW0sIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1688964665138!5m2!1svi!2s"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

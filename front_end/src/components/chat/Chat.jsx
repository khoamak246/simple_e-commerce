import React from "react";
import ChatBubble from "./ChatBubble";
import { useState } from "react";
import ChatText from "./ChatText";
import ChatImg from "./ChatImg";
import ChatLoading from "./ChatLoading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  get_room_by_user_id,
  update_with_socket,
} from "../../thunk/UserRoomThunk";
import {
  ROOM_ROOM_LIST_STATE_SELECTOR,
  ROOM_SELECT_ROOM_STATE_SELECTOR,
  TOGGLE_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import { resetToggle, setToggle } from "../../redux/reducers/ToggleSlice";
import { handleFindSellerInUserRoom } from "../../utils/Utils";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useRef } from "react";
import { iconList } from "../../assets/js/IconList";
import { toast } from "react-hot-toast";
import { firebase_multiple_upload } from "../../firebase/FirebaseService";
import ChatVideo from "./ChatVideo";
let stompClient = null;
export default function Chat() {
  const fileInputRef = useRef(null);
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const toggleSelector = useSelector(TOGGLE_STATE_SELECTOR);
  const roomListSelector = useSelector(ROOM_ROOM_LIST_STATE_SELECTOR);
  const selectRoomSelector = useSelector(ROOM_SELECT_ROOM_STATE_SELECTOR);
  const [inputChat, setInputChat] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [toggleWaiting, setToggleWaiting] = useState(false);
  const [toggleAvatar, setToggleAvatar] = useState(false);
  const [uploadFileList, setUploadFileList] = useState({
    previewURL: [],
    files: [],
  });
  const dispatch = useDispatch();

  // CONNECT WS AND QUERY ROOM
  useEffect(() => {
    dispatch(get_room_by_user_id());
    connect();
  }, []);

  // CONNECT SOCKET
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  // ON_ERROR_CONNECT
  const onError = (error) => {
    console.log(error);
  };

  // ON_CONECTED_SUCESSFULLY
  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + userSelector.username + "/private",
      onPrivateMessageReceived
    );
  };

  // ON RECEIVER MESSAGE
  const onPrivateMessageReceived = (payload) => {
    let receivedValue = JSON.parse(payload.body);
    dispatch(update_with_socket(receivedValue));
  };

  // ON SEND MESSAGE
  const onSendMessage = (content, type) => {
    if (connect && content !== "" && type) {
      if (content.trim().length !== 0) {
        let receiverUser = "";
        let sellerUserRoom = handleFindSellerInUserRoom(
          selectRoomSelector,
          "SELLER"
        );

        if (sellerUserRoom.userInfo.user.id === userSelector.id) {
          receiverUser = handleFindSellerInUserRoom(
            selectRoomSelector,
            "CUSTOMER"
          ).userInfo.user.username;
        } else {
          receiverUser = sellerUserRoom.userInfo.user.username;
        }

        let chatMessage = {
          senderName: userSelector.username,
          receiverName: receiverUser,
          content,
          chatContentType: type,
          roomId: selectRoomSelector.room.id,
          chatMessageStatus: "MESSAGE",
        };
        stompClient.send(
          "/app/private-message",
          {},
          JSON.stringify(chatMessage)
        );
      }
      setInputChat("");
      setToggleAvatar(false);
    }
  };

  // ON CHANGE INPUT FILE
  const onChangeInputFile = (e) => {
    uploadFileList.previewURL.map((e) => URL.revokeObjectURL(e));
    let files = [...e.target.files];

    let isUploadFileValid = isListFileValid(files);
    if (isUploadFileValid) {
      let previewURL = [];
      files.map((e) =>
        previewURL.push({
          url: URL.createObjectURL(e),
          type: e.type.includes("image") ? "image" : "video",
        })
      );

      setUploadFileList({ previewURL, files });
      document.getElementById("inputFile").value = "";
    } else {
      toast.error(
        "OOP! Choosen item must be image or video and max upload each turn will be 5!"
      );
    }
  };

  // VALID LIST UPLOAD FILE
  const isListFileValid = (listFile) => {
    if (!listFile || listFile.length <= 0 || listFile.length > 5) {
      return false;
    }
    for (let i = 0; i < listFile.length; i++) {
      if (!listFile[i].type.startsWith("image")) {
        if (!listFile[i].type.startsWith("video")) {
          return false;
        }
      }
    }
    return true;
  };

  // SEND MESSAGE WITH IMAGE OR VIDEO
  const handleSendMessageWithImageOrVideo = async (content) => {
    setToggleWaiting(true);
    let upload = [...uploadFileList.files];
    uploadFileList.previewURL.map((e) => URL.revokeObjectURL(e));
    setUploadFileList({
      previewURL: [],
      files: [],
    });

    let uploadURLArr = await firebase_multiple_upload(upload);
    for (let i = 0; i < uploadURLArr.length; i++) {
      const e = uploadURLArr[i];
      let url = e.split("_assetType:")[0];
      let type = e.split("_assetType:")[1].toUpperCase();
      onSendMessage(url, type);
      if (i == uploadURLArr.length - 1 && content && content !== "") {
        setTimeout(() => {
          onSendMessage(content, "TEXT");
        }, 300);
      }
    }
    setToggleWaiting(false);
  };

  // RENDER ROOM LIST
  const handleRenderRoomList = () => {
    let tempArr = [];
    roomListSelector.map((e) => {
      let tempUserRoom = e.room.userRoom;
      let temp = tempUserRoom.find(
        (o) =>
          o.userInfo.user.id !== userSelector.id &&
          ((o.role.name === "CUSTOMER" &&
            o.userInfo.user.fullName
              .toLowerCase()
              .trim()
              .includes(inputSearch.toLowerCase().trim())) ||
            (o.role.name === "SELLER" &&
              o.userInfo.user.shop.name
                .toLowerCase()
                .trim()
                .includes(inputSearch.toLowerCase().trim())))
      );
      if (temp) {
        tempArr.push(e);
      }
    });
    return tempArr;
  };

  // RESET ALL
  const resetAll = () => {
    setToggleAvatar(false);
    setInputChat("");
    setUploadFileList({
      previewURL: [],
      files: [],
    });
    if (document.getElementById("inputFile")) {
      document.getElementById("inputFile").value = "";
    }
  };

  // SCROLL TO END
  useEffect(() => {
    let element = document.getElementById("chatContainer");
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }, [toggleSelector, selectRoomSelector, toggleWaiting]);

  return (
    <div
      className={`fixed bottom-[2%] right-[1%] bg-white rounded-md border-[#878787a4] border-[1px] shadow-2xl shadow-[#878787] overflow-hidden ${
        toggleSelector === "chat"
          ? "w-[50vw] h-[80vh]"
          : "flex justify-center items-center gap-2 cursor-pointer w-[8vw] h-[8vh]"
      } transition-all duration-300 z-[20]`}
    >
      {toggleSelector !== "chat" && (
        <div
          className={`absolute top-0 left-0 w-full h-full opacity-0`}
          onClick={() => dispatch(setToggle("chat"))}
        ></div>
      )}

      {toggleSelector === "chat" ? (
        <>
          <div className="border-b-[1px] border-solid border-[#878787] w-full h-[8%] flex justify-between items-center px-3 shadow-sm">
            <p className="text-[#EF5435] text-xl font-semibold">Chat</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                resetAll();
                dispatch(resetToggle());
              }}
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
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-[92%] flex">
            <div className="w-1/3 h-full border-r-[1px] border-solid border-[#878787] shadow-sm flex flex-col relative">
              {/* AVATAR */}
              <div
                className={`${
                  toggleAvatar ? "w-[90%] h-40" : "w-0 h-0"
                } absolute bottom-[2%] right-[2%]  rounded-lg flex flex-col justify-center items-center overflow-hidden duration-300 transition-all z-[50] bg-white border shadow-lg`}
              >
                <div className="w-full flex justify-center items-center border-b bg-orange-300">
                  <p className="text-white font-semibold">Icon</p>
                </div>
                <div className="bg-white w-[90%] h-[90%] grid grid-cols-7 items-center">
                  {iconList.map((val, index) => {
                    return (
                      <div className="group" key={index}>
                        <p
                          className="cursor-pointer hover:scale-110 duration-150 transition-all text-center group-hover:animate-bounce"
                          onClick={() => {
                            setInputChat(inputChat + val.icon);
                          }}
                        >
                          {val.icon}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* SEARCH */}
              <div className="w-full h-[10%] px-2 py-1 flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm outline-none border-solid border-slate-400 border-[1px] rounded-sm py-1 px-2"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
              {/* BUBBLE */}
              <div className="w-full h-[90%] flex flex-col overflow-auto">
                {handleRenderRoomList().map((val, index) => {
                  return <ChatBubble key={index} userRoom={val} />;
                })}
              </div>
            </div>
            {/* CONTENT */}
            {roomListSelector.length == 0 || selectRoomSelector == null ? (
              <div className="w-2/3 h-full flex justify-center items-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/nothing2.jpg?alt=media&token=bba33f2c-69b9-4097-9157-cc12c8fed2bb"
                  alt=""
                  className="w-[60%]"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="w-2/3 h-full flex flex-col">
                {/* BODY */}
                <div
                  className="w-full h-[85%] flex flex-col overflow-auto relative"
                  id="chatContainer"
                >
                  {selectRoomSelector &&
                    selectRoomSelector.room.chat.map((val, index) => {
                      switch (val.chatType.name) {
                        case "TEXT":
                          return (
                            <ChatText
                              key={val.id}
                              isUser={val.userInfo.user.id === userSelector.id}
                              chat={val.content}
                            />
                          );

                        case "IMAGE":
                          return (
                            <ChatImg
                              key={val.id}
                              isUser={val.userInfo.user.id === userSelector.id}
                              chat={val.url}
                            />
                          );
                        case "VIDEO":
                          return (
                            <ChatVideo
                              key={val.id}
                              isUser={val.userInfo.user.id === userSelector.id}
                              chat={val.url}
                            />
                          );
                      }
                    })}
                  {toggleWaiting && <ChatLoading />}
                  <div
                    className={`${
                      uploadFileList.files.length !== 0 ? "h-[20%]" : "h-0"
                    } absolute bottom-0 left-0 w-full  bg-orange-300 rounded-t grid grid-cols-5 gap-2 px-2 items-center overflow-hidden duration-200 transition-all`}
                  >
                    {uploadFileList.previewURL.map((val, index) => {
                      return (
                        <div
                          className="w-full h-[80%] relative group"
                          key={index}
                        >
                          <img
                            src={
                              val.type === "image"
                                ? val.url
                                : "https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/video_icon.png?alt=media&token=f0a5276c-4c63-40b0-87d4-6978e6245809g"
                            }
                            alt=""
                            className="h-full rounded"
                            draggable={false}
                          />
                          <div
                            className="absolute top-0 right-0 cursor-pointer scale-0 group-hover:scale-100 overflow-hidden duration-200 transition-all"
                            onClick={() => {
                              URL.revokeObjectURL(val);
                              let previewURL = [...uploadFileList.previewURL];
                              let files = [...uploadFileList.files];
                              previewURL.splice(index, 1);
                              files.splice(index, 1);
                              setUploadFileList({ previewURL, files });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 fill-orange-100"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                    })}

                    {/* <img
                      src="https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/video_icon.png?alt=media&token=f0a5276c-4c63-40b0-87d4-6978e6245809g"
                      alt=""
                      className="h-[80%] rounded"
                    /> */}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="w-full h-[15%] flex flex-col">
                  <div className="w-full h-1/2 border-slate-400 border-solid border-t-[1px] border-b-[1px] relative">
                    {/* INPUT FILE */}
                    <input
                      id="inputFile"
                      type="file"
                      className="absolute top-0 left-0 z-[-1]"
                      ref={fileInputRef}
                      accept="image/*, video/*"
                      multiple={true}
                      onChange={onChangeInputFile}
                    />
                    <input
                      type="text"
                      placeholder="Message..."
                      className="text-sm outline-none w-full h-full px-2"
                      value={inputChat}
                      onChange={(e) => setInputChat(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (uploadFileList.files.length !== 0) {
                            handleSendMessageWithImageOrVideo(inputChat);
                          } else {
                            onSendMessage(inputChat, "TEXT");
                          }
                          setInputChat("");
                        }
                      }}
                    />
                  </div>
                  <div className="w-full h-1/2 flex justify-between gap-2 px-1 items-center">
                    <div className="flex gap-2">
                      {/* AVATAR */}
                      <div
                        className="cursor-pointer"
                        onClick={() => setToggleAvatar(!toggleAvatar)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-slate-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>
                      </div>
                      {/* IMG/ VIDEO */}
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setToggleAvatar(false);
                          fileInputRef.current.click();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-slate-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* SEND */}
                    <div className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-slate-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-[#EE4D2D] text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </div>
          <p className="text-[#EE4D2D]">Chat</p>
        </>
      )}
    </div>
  );
}

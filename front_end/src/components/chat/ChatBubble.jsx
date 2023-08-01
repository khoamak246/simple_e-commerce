import React from "react";
import {
  handleFindPartnerInUserRoomById,
  handleFindUserInUserRoomById,
} from "./../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  ROOM_SELECT_ROOM_STATE_SELECTOR,
  USER_STATE_SELECTOR,
} from "../../redux/selectors/Selectors";
import { patch_update_last_access } from "../../thunk/UserRoomThunk";

export default function ChatBubble({ userRoom }) {
  const selectRoomSelector = useSelector(ROOM_SELECT_ROOM_STATE_SELECTOR);
  const userSelector = useSelector(USER_STATE_SELECTOR);
  const dispatch = useDispatch();

  const handleRenderLastMessage = () => {
    let listChat = [...userRoom.room.chat];
    listChat.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      } else if (a.id < b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    if (listChat.length !== 0) {
      let lastMessage = listChat[0];
      if (lastMessage.chatType.name === "IMAGE") {
        return "sent an image";
      } else if (lastMessage.chatType.name === "VIDEO") {
        return "sent a video";
      } else {
        return lastMessage.content;
      }
    } else {
      return "";
    }
  };

  const countNotReadMessage = () => {
    let userRoomHasCurrentUser = handleFindUserInUserRoomById(
      userRoom,
      userSelector.id
    );
    let chat = [...userRoom.room.chat];
    let count = 0;
    chat.map((e) => {
      if (e.createdTime > userRoomHasCurrentUser.latsAccess) {
        count++;
      }
    });
    return count;
  };

  const hanleFindPartner = () => {
    let partnerUserRoom = handleFindPartnerInUserRoomById(
      userRoom,
      userSelector.id
    );
    let img = "";
    let name = "";
    let tempUser = partnerUserRoom.userInfo.user;
    if (partnerUserRoom.role.name === "SELLER") {
      img = tempUser.shop.avatar;
      name = tempUser.shop.name;
    } else {
      img = partnerUserRoom.userInfo.avatar;
      name = tempUser.fullName;
    }

    return { img, name };
  };

  return (
    <div
      className={`${
        selectRoomSelector &&
        selectRoomSelector.id === userRoom.id &&
        "bg-slate-200"
      } w-full h-[10vh] flex px-2 gap-1 cursor-pointer duration-200 transition-all hover:bg-slate-200 justify-center items-center`}
      onClick={() => dispatch(patch_update_last_access(userRoom.id))}
    >
      <div className="w-[20%]">
        <img
          src={hanleFindPartner().img}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="w-[80%] flex flex-col relative">
        <div className="w-full flex justify-between">
          <div className="w-[60%] text-ellipsis whitespace-nowrap overflow-hidden">
            {hanleFindPartner().name}
          </div>
        </div>
        <div className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-sm text-[#878787]">
          {handleRenderLastMessage()}
        </div>
        <div
          className={`${
            countNotReadMessage() === 0 && "hidden"
          } absolute top-[10%] right-0 rounded-full w-5 h-5 bg-red-600 flex items-center justify-center`}
        >
          <p className={`text-[0.8rem] text-white font-semibold`}>
            {countNotReadMessage()}
          </p>
        </div>
      </div>
    </div>
  );
}

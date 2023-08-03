package com.e_commerce.controller;

import com.e_commerce.dto.request.RoomCreateForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/userRoom")
@RequiredArgsConstructor
public class UserRoomController {
    private final IUserRoomService userRoomService;
    private final IRoomService roomService;
    private final IUserService userService;
    private final IRoleService roleService;
    private final IShopService shopService;
    private final IValidateService validateRegex;

    @PatchMapping("/updateLasted/{userRoomId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'PM', 'USER')")
    public ResponseEntity<ResponseMessage> updateLatestAccess(@PathVariable Long userRoomId){

        UserRoom userRoom = userRoomService.findById(userRoomId);
        userRoom.setLatsAccess(System.currentTimeMillis());
        UserRoom justSavedUserRoom = userRoomService.save(userRoom);
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update successfully!", justSavedUserRoom));
    }


    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'PM', 'USER')")
    public ResponseEntity<ResponseMessage> getRoomByUserId(@PathVariable Long userId){
        userService.isUserIdEqualUserPrincipalId(userId);
        User user = userService.findById(userId);
        List<UserRoom> userRoomList = userRoomService.findByUserInfoIdOrderByLatsAccessDesc(user.getUserInfo().getId());
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Query successfully!", userRoomList));
    }


    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'PM', 'USER')")
    public ResponseEntity<ResponseMessage> createNewRoom(@Validated @RequestBody RoomCreateForm roomCreateForm, BindingResult result){
        validateRegex.isValidForm(result);
        userService.isUserIdEqualUserPrincipalId(roomCreateForm.getUserId());

        User user = userService.findById(roomCreateForm.getUserId());

        Shop shop = shopService.findById(roomCreateForm.getShopId());

        User seller = shop.getUser();
        Room room = Room.builder()
                .name(user.getUsername() + "_" + seller.getUsername())
                .userNumber(2)
                .status(true)
                .build();

        Room justSavedRoom = roomService.save(room);
        Role customerRole = roleService.findByName(RoleName.CUSTOMER);
        Role sellerRole = roleService.findByName(RoleName.SELLER);
        UserRoom userRoom = UserRoom.builder()
                .role(customerRole)
                .room(justSavedRoom)
                .userInfo(user.getUserInfo())
                .latsAccess(System.currentTimeMillis())
                .build();
        userRoomService.save(userRoom);
        UserRoom sellerRoom = UserRoom.builder()
                .role(sellerRole)
                .room(justSavedRoom)
                .userInfo(seller.getUserInfo())
                .build();
        userRoomService.save(sellerRoom);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create room successfully!", justSavedRoom));
    }


}

package com.e_commerce.controller;

import com.e_commerce.dto.request.RoomCreateForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.service.*;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/userRoom")
@RequiredArgsConstructor
public class UserRoomController {
    private final IUserRoomService userRoomService;
    private final IRoomService roomService;
    private final IUserService userService;
    private final IRoleService roleService;
    private final IShopService shopService;

    @PatchMapping("/updateLasted/{userRoomId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'PM', 'USER')")
    public ResponseEntity<ResponseMessage> updateLatestAccess(@PathVariable Long userRoomId){

        Optional<UserRoom> userRoom = userRoomService.findById(userRoomId);
        if (!userRoom.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user_room at id: " + userRoomId));
        }

        userRoom.get().setLatsAccess(System.currentTimeMillis());
        UserRoom justSavedUserRoom = userRoomService.save(userRoom.get());
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update successfully!", justSavedUserRoom));
    }


    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'PM', 'USER')")
    public ResponseEntity<ResponseMessage> getRoomByUserId(@PathVariable Long userId){

        if (!userService.isUserIdEqualUserPrincipalId(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with principal!"));
        }

        Optional<User> user = userService.findById(userId);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + userId));
        }

        List<UserRoom> userRoomList = userRoomService.findByUserInfoIdOrderByLatsAccessDesc(user.get().getUserInfo().getId());
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Query successfully!", userRoomList));
    }


    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'PM', 'USER')")
    public ResponseEntity<ResponseMessage> createNewRoom(@Validated @RequestBody RoomCreateForm roomCreateForm, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        if (!userService.isUserIdEqualUserPrincipalId(roomCreateForm.getUserId())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with principal!"));
        }

        Optional<User> user = userService.findById(roomCreateForm.getUserId());
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + roomCreateForm.getUserId()));
        }

        Optional<Shop> shop = shopService.findById(roomCreateForm.getShopId());
        if (!shop.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found shop at id: " + roomCreateForm.getShopId()));
        }

        User seller = shop.get().getUser();

        Room room = Room.builder()
                .name(user.get().getUsername() + "_" + seller.getUsername())
                .userNumber(2)
                .status(true)
                .build();

        Room justSavedRoom = roomService.save(room);
        Role customerRole = roleService.findByName(RoleName.CUSTOMER).orElseThrow(() -> new IllegalArgumentException("Not found role customer matches"));
        Role sellerRole = roleService.findByName(RoleName.SELLER).orElseThrow(() -> new IllegalArgumentException("Not found role seller matches"));

        UserRoom userRoom = UserRoom.builder()
                .role(customerRole)
                .room(justSavedRoom)
                .userInfo(user.get().getUserInfo())
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

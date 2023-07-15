package com.e_commerce.controller;

import com.e_commerce.dto.request.UpdateUserForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.User;
import com.e_commerce.service.IUserService;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;
    private final PasswordEncoder passwordEncoder;

    @PutMapping("/{userId}")
    public ResponseEntity<ResponseMessage> putUpdateUser(@PathVariable Long userId, @RequestBody User user){

        if (!userService.isUserIdEqualUserPrincipalId(userId)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user request!"));
        }
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update user successfully!", userService.save(user)));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<ResponseMessage> patchUpdateUser(@PathVariable Long userId, @Validated @RequestBody UpdateUserForm updateUserForm, BindingResult result){

        if(result.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        if (!userService.isUserIdEqualUserPrincipalId(userId)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user request!"));
        }

        Optional<User> user = userService.findById(userId);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + userId));
        }

        if (updateUserForm.getFullName() != null){
            user.get().setFullName(updateUserForm.getFullName());
        }

        if (updateUserForm.getCurrentPassword() != null
                && updateUserForm.getNewPassword() != null
                && userService.isMatcherWithCurrentPassword(userId, updateUserForm.getCurrentPassword())){
            user.get().setPassword(passwordEncoder.encode(updateUserForm.getNewPassword()));
        }

        if (updateUserForm.getEmail() != null) {
            user.get().setEmail(updateUserForm.getEmail());
        }

        if (updateUserForm.getPhoneNumber() != null) {
            user.get().setPhoneNumber(updateUserForm.getPhoneNumber());
        }

        user.get().getUserInfo().setGender(updateUserForm.getGender());

        if (updateUserForm.getDateOfBirth() != null){
            user.get().getUserInfo().setDateOfBirth(updateUserForm.getDateOfBirth());
        }

        if (updateUserForm.getAvatar() != null){
            user.get().getUserInfo().setAvatar(updateUserForm.getAvatar());
        }

        if (updateUserForm.getUserAddresses() != null){
            user.get().getUserInfo().setUserAddresses(updateUserForm.getUserAddresses());
        }

        return ResponseEntity.ok(Utils.buildSuccessMessage("Update user successfully!", userService.save(user.get())));

    }

}

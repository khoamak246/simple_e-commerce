package com.e_commerce.controller;

import com.e_commerce.dto.request.UpdateUserForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.User;
import com.e_commerce.service.IUserService;
import com.e_commerce.service.IValidateService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;
    private final IValidateService validateRegex;

    @PutMapping("/{userId}")
    public ResponseEntity<ResponseMessage> putUpdateUser(@PathVariable Long userId, @RequestBody User user){
        userService.isUserIdEqualUserPrincipalId(userId);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update user successfully!", userService.save(user)));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<ResponseMessage> patchUpdateUser(@PathVariable Long userId, @Validated @RequestBody UpdateUserForm updateUserForm, BindingResult result) {

        validateRegex.isValidForm(result);
        userService.isUserIdEqualUserPrincipalId(userId);
        User user = userService.findById(userId);
        User afterUpdateUser = userService.updateUserFromForm(user, updateUserForm);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update user successfully!", userService.save(afterUpdateUser)));

    }


    @GetMapping("/{userId}")
    public ResponseEntity<ResponseMessage> getUserById(@PathVariable Long userId) {
        userService.isUserIdEqualUserPrincipalId(userId);
        User user = userService.findById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Query successfully!", user));
    }
}

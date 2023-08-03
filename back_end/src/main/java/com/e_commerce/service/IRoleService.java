package com.e_commerce.service;

import com.e_commerce.model.Role;
import com.e_commerce.model.RoleName;

import java.util.Set;

public interface IRoleService {
    Role findByName(RoleName name);
    Set<Role> createUserRegisterRole(Set<String> registerFormRole);
}

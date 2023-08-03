package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Role;
import com.e_commerce.model.RoleName;
import com.e_commerce.repository.IRoleRepository;
import com.e_commerce.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleServiceIMPL implements IRoleService {

    private final IRoleRepository roleRepository;


    @Override
    public Role findByName(RoleName name) {
        Optional<Role> role = roleRepository.findByName(name);
        if (!role.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "FAILED -> NOT EXIST ROLE IN DB");
        }
        return role.get();
    }

    @Override
    public Set<Role> createUserRegisterRole(Set<String> registerFormRole) {
        Set<Role> roles = new HashSet<>();
        if (registerFormRole == null || registerFormRole.isEmpty()) {
            Role userRole = roleRepository.findByName(RoleName.USER).orElseThrow(() -> new RuntimeException("FAILED -> NOT EXIST ROLE IN DB"));
            roles.add(userRole);
        } else {
            for (String role : registerFormRole) {
                switch (role) {
                    case "ADMIN":
                        Role adminRole = findByName(RoleName.ADMIN);
                        roles.add(adminRole);
                    case "PM":
                        Role pmRole = findByName(RoleName.PM);
                        roles.add(pmRole);
                    case "USER":
                        Role userRole = findByName(RoleName.USER);
                        roles.add(userRole);
                }
            }
        }
        return roles;
    }
}

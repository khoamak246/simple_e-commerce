package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Role;
import com.e_commerce.model.RoleName;
import com.e_commerce.repository.IRoleRepository;
import com.e_commerce.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleServiceIMPL implements IRoleService {

    private final IRoleRepository roleRepository;


    @Override
    public Optional<Role> findByName(RoleName name) {
        return roleRepository.findByName(name);
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
                        Role adminRole = roleRepository.findByName(RoleName.ADMIN).orElseThrow(() -> new RuntimeException("FAILED -> NOT EXIST ROLE IN DB"));
                        roles.add(adminRole);
                    case "PM":
                        Role pmRole = roleRepository.findByName(RoleName.PM).orElseThrow(() -> new RuntimeException("FAILED -> NOT EXIST ROLE IN DB"));
                        roles.add(pmRole);
                    case "USER":
                        Role userRole = roleRepository.findByName(RoleName.USER).orElseThrow(() -> new RuntimeException("FAILED -> NOT EXIST ROLE IN DB"));
                        roles.add(userRole);
                }
            }
        }
        return roles;
    }
}

package com.example.demo.controller;

import com.example.demo.entity.ExampleEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class ExampleController {

    private final UserRepository userRepository;

    public ExampleController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<ExampleEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public ExampleEntity createUser(@RequestBody ExampleEntity user) {
        return userRepository.save(user);
    }
}
package com.eringa.Reversi.controller;

import com.eringa.Reversi.payload.request.LoginRequest;
import com.eringa.Reversi.payload.request.SignupRequest;
import com.eringa.Reversi.payload.response.JwtResponse;
import com.eringa.Reversi.payload.response.MessageResponse;
import com.eringa.Reversi.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthorizationService authorizationService;


    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authorizationService.authenticateUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> registerUser(@RequestBody SignupRequest signUpRequest) {
        return authorizationService.registerUser(signUpRequest);
    }
}

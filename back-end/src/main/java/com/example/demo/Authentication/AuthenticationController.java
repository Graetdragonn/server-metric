package com.example.demo.Authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    @CrossOrigin
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
     return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/sign-in")
    @CrossOrigin
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}

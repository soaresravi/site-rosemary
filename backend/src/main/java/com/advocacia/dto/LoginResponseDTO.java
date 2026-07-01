package com.advocacia.dto;

public class LoginResponseDTO {
    
    public String token, email, nome;

    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, String email, String nome, String email2) {
        this.token = token;
        this.email = email;
        this.nome = nome;
        this.email = email2;
    }
}
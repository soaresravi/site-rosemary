package com.advocacia.dto;

import jakarta.validation.constraints.*;

public class RegisterDTO {
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
   
    public String email;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
   
    public String senha;
    
    public String confirmarSenha;
}
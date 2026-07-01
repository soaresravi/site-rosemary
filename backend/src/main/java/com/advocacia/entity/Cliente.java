package com.advocacia.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")

public class Cliente extends PanacheEntity {
    
    @Column(name = "cliente_id", nullable = false)
    public Long clienteId;
    
    @Column(name = "tipo_cliente", nullable = false)
    public String tipoCliente;
    
    @Column(unique = true, nullable = false)
    public String email;
    
    @Column(nullable = false)
    public String senha;
    
    @Column(name = "data_cadastro")
    public LocalDateTime dataCadastro = LocalDateTime.now();
    
    @Column(name = "user_id")
    public Long userId;
}
package com.advocacia.entity;

import com.advocacia.enums.*;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "processos")

public class Processo extends PanacheEntity {
    
    @Column(name = "clienteNome")
    public String clienteNome;
    
    @Column(name = "numeroProcesso", nullable = false)
    public String numeroProcesso;
    
    @Column(name = "tipoAcao")
    public String tipoAcao;
    
    @Enumerated(EnumType.STRING)
    public StatusProcesso status;
    
    @Column(name = "dataInicio")
    public LocalDate dataInicio;
    
    @Enumerated(EnumType.STRING)
    public FaseProcesso fase;
    
    @Enumerated(EnumType.STRING)
    public Instancia instancia;
    
    public String comarca;
    
    public String vara;
    
    @Enumerated(EnumType.STRING)
    public ResultadoProcesso resultado;
    
    @Column(columnDefinition = "TEXT")
    public String observacoes;
    
    @Column(name = "userId")
    public Long userId;
    
    @Column(name = "createdAt")
    public LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updatedAt")
    public LocalDateTime updatedAt;
}
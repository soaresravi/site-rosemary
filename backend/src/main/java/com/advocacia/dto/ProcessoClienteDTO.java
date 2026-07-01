package com.advocacia.dto;

import com.advocacia.entity.Processo;
import java.time.LocalDate;

public class ProcessoClienteDTO {
    
    public Long id;
    public String clienteNome, numeroProcesso, tipoAcao, status;
    public LocalDate dataInicio;
    public String fase, instancia, comarca, vara, resultado, observacoes;

    public ProcessoClienteDTO() {}

    public ProcessoClienteDTO(Processo p) {
        this.id = p.id;
        this.clienteNome = p.clienteNome;
        this.numeroProcesso = p.numeroProcesso;
        this.tipoAcao = p.tipoAcao;
        this.status = p.status != null ? p.status.getDescricao() : null;
        this.dataInicio = p.dataInicio;
        this.fase = p.fase != null ? p.fase.getDescricao() : null;
        this.instancia = p.instancia != null ? p.instancia.getDescricao() : null;
        this.comarca = p.comarca;
        this.vara = p.vara;
        this.resultado = p.resultado != null ? p.resultado.getDescricao() : null;
        this.observacoes = p.observacoes;
    }
}
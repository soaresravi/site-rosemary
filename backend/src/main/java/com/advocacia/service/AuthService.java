package com.advocacia.service;

import com.advocacia.dto.*;
import com.advocacia.entity.Cliente;

import io.smallrye.jwt.build.Jwt;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.persistence.*;
import java.security.*;

import java.time.LocalDateTime;
import java.util.*;

@ApplicationScoped
public class AuthService {

    private static final String ISSUER = "sistema-advocacia";
    private static final int TOKEN_EXPIRY_SECONDS = 86400;

    @PersistenceContext
    EntityManager entityManager;

    private String hashSenha(String senha) {
        
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(senha.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao criptografar senha", e);
        }

    }

    private String generateJWT(Long clienteId, String email, String nome) {
        Set<String> groups = new HashSet<>();
        groups.add("cliente");
        return Jwt.issuer(ISSUER).subject(email).groups(groups).claim("clienteId", clienteId).claim("nome", nome).expiresIn(TOKEN_EXPIRY_SECONDS).sign();
    }

    private Long verificarClienteExistente(String email) {

        String sqlPf = "SELECT id FROM clientes_pf WHERE email = ?1";
        Query queryPf = entityManager.createNativeQuery(sqlPf);
        
        queryPf.setParameter(1, email);
        List<?> resultPf = queryPf.getResultList();
        
        if (!resultPf.isEmpty()) {
            return ((Number) resultPf.get(0)).longValue();
        }

        String sqlPj = "SELECT id FROM clientes_pj WHERE email = ?1";
        Query queryPj = entityManager.createNativeQuery(sqlPj);
       
        queryPj.setParameter(1, email);
        List<?> resultPj = queryPj.getResultList();
       
        if (!resultPj.isEmpty()) {
            return ((Number) resultPj.get(0)).longValue();
        }

        return null;

    }

    @Transactional
    public LoginResponseDTO login(AuthDTO auth) {
        
        Cliente cliente = Cliente.find("email", auth.email).firstResult();
        
        if (cliente == null) {
            throw new RuntimeException("Email não encontrado. Verifique se você já criou sua senha.");
        }
        
        if (!cliente.senha.equals(hashSenha(auth.senha))) {
            throw new RuntimeException("Senha incorreta");
        }
        
        String nomeCliente = buscarNomeCliente(cliente.clienteId, cliente.tipoCliente);
        String token = generateJWT(cliente.id, cliente.email, nomeCliente);
        
        return new LoginResponseDTO(token, cliente.email, nomeCliente, cliente.email);
    
    }

    @Transactional
    public void register(RegisterDTO register) {

        Cliente clienteExistente = Cliente.find("email", register.email).firstResult();

        if (clienteExistente != null) {
            throw new RuntimeException("Este email já possui senha cadastrada. Faça login.");
        }

        Long clienteId = verificarClienteExistente(register.email);
       
        if (clienteId == null) {
            throw new RuntimeException("Email não encontrado. Você precisa ser um cliente da advogada para acessar esta área.");
        }

        String tipoCliente = determinarTipoCliente(register.email);
        Cliente novoCliente = new Cliente();
        
        novoCliente.clienteId = clienteId;
        novoCliente.tipoCliente = tipoCliente;
        novoCliente.email = register.email;
        novoCliente.senha = hashSenha(register.senha);
        novoCliente.dataCadastro = LocalDateTime.now();
        novoCliente.userId = buscarUserId(clienteId, tipoCliente);
        novoCliente.persist();
    
    }

    private String buscarNomeCliente(Long clienteId, String tipoCliente) {
        
        String sql;
        
        if ("PF".equals(tipoCliente)) {
            sql = "SELECT nome FROM clientes_pf WHERE id = ?1";
        } else {
            sql = "SELECT nomeFantasia FROM clientes_pj WHERE id = ?1";
        }
        
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter(1, clienteId);
        
        return (String) query.getSingleResult();
    
    }

    private String determinarTipoCliente(String email) {
      
        String sqlPf = "SELECT 'PF' FROM clientes_pf WHERE email = ?1";
        Query queryPf = entityManager.createNativeQuery(sqlPf);
      
        queryPf.setParameter(1, email);
        List<?> resultPf = queryPf.getResultList();
      
        if (!resultPf.isEmpty()) {
            return "PF";
        }
      
        return "PJ";
    
    }

    private Long buscarUserId(Long clienteId, String tipoCliente) {
        
        String sql;
        
        if ("PF".equals(tipoCliente)) {
            sql = "SELECT userId FROM clientes_pf WHERE id = ?1";
        } else {
            sql = "SELECT userId FROM clientes_pj WHERE id = ?1";
        }
        
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter(1, clienteId);
        return ((Number) query.getSingleResult()).longValue();
    
    }
}
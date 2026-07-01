package com.advocacia.resource;

import com.advocacia.dto.*;
import com.advocacia.entity.Processo;
import com.advocacia.service.AuthService;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.*;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.*;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class ClienteResource {

    @Inject
    AuthService authService;

    @PersistenceContext
    EntityManager entityManager;

    @POST
    @Path("/auth/login")
    
    public Response login(AuthDTO auth) {
       
        try {
            LoginResponseDTO response = authService.login(auth);
            return Response.ok(response).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return Response.status(401).entity(error).build();
        }

    }

    @POST
    @Path("/auth/register")
    
    public Response register(RegisterDTO register) {
    
        try {
            authService.register(register);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cadastro realizado com sucesso");
            return Response.ok(response).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return Response.status(400).entity(error).build();
        }

    }


    private String buscarNomeClientePorEmail(String email) {
        
        String sqlPf = "SELECT nome FROM clientes_pf WHERE email = ?1";
        Query queryPf = entityManager.createNativeQuery(sqlPf);
      
        queryPf.setParameter(1, email);
        List<?> resultPf = queryPf.getResultList();
        
        if (!resultPf.isEmpty()) {
            return (String) resultPf.get(0);
        }

        String sqlPj = "SELECT nomeFantasia FROM clientes_pj WHERE email = ?1";
        Query queryPj = entityManager.createNativeQuery(sqlPj);
      
        queryPj.setParameter(1, email);
        List<?> resultPj = queryPj.getResultList();
        
        if (!resultPj.isEmpty()) {
            return (String) resultPj.get(0);
        }

        return null;

    }

    @GET
    @RolesAllowed("cliente") 
    @Path("/clientes/{email}/processos")
   
    public Response getProcessosPorEmail(@PathParam("email") String email, @Context SecurityContext securityContext) {
    
        if (securityContext.getUserPrincipal() == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Não autorizado");
            return Response.status(401).entity(error).build();
        }

        String nomeCliente = buscarNomeClientePorEmail(email);
        
        if (nomeCliente == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Cliente não encontrado com este email");
            return Response.status(404).entity(error).build();
        }

        List<Processo> processos = Processo.find("clienteNome = ?1 ORDER BY dataInicio DESC", nomeCliente).list();
        
        if (processos.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Nenhum processo encontrado para este cliente");
            return Response.status(404).entity(error).build();
        }

        List<ProcessoClienteDTO> dtos = processos.stream().map(ProcessoClienteDTO::new).toList();
        return Response.ok(dtos).build();
    }
}
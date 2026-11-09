package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.entity.SupplierEntity;

@Repository
public interface SupplierRepo extends JpaRepository<SupplierEntity, String> {

   


   
}

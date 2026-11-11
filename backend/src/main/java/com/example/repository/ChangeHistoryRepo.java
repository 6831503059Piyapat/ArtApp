package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.entity.SupplierEntity;
import com.example.entity.ChangesHistoryEntity;

@Repository
public interface ChangeHistoryRepo extends JpaRepository<ChangesHistoryEntity, String> {

   


   
}

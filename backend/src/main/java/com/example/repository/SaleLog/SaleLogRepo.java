package com.example.repository.SaleLog;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.entity.SaleLogsEntity;

@Repository
public interface SaleLogRepo extends JpaRepository<SaleLogsEntity, String> {

   


   
}

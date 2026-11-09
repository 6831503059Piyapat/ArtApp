package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.entity.ExpenseLogEntity;


@Repository
public interface ExpenseRepo extends JpaRepository<ExpenseLogEntity, String> {

   


   
}

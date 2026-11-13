package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.entity.ExpenseLogEntity;


@Repository
public interface ExpenseRepo extends JpaRepository<ExpenseLogEntity, String> {

   @Query(
        value = """
        SELECT SUM(amount) AS total_expenses FROM expense_log WHERE sale_run_id = :saleRunId
        """, nativeQuery = true
    )
    Double findTotalExpensesBySaleRunId(@Param("saleRunId") String saleRunId);


   
}

package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.entity.SupplierEntity;
import com.example.entity.ExpenseLogEntity;
import org.springframework.transaction.annotation.Transactional;
import com.example.entity.ChangesHistoryEntity;
import java.util.List;
import org.springframework.data.repository.query.Param;


@Repository
public interface ExpensesLogRepo extends JpaRepository<ExpenseLogEntity, String> {
    @Query(value="""
        SELECT expense_id,amount,category,description,paid_by_user_name,sale_run_id,time_stamp FROM expense_log  WHERE sale_run_id = :saleRunId
        """,nativeQuery = true)

    List<ExpenseLogEntity> findBySaleRunId(@Param("saleRunId") String saleRunId);
    @Modifying
    @Transactional
    @Query (value="""
        INSERT INTO expense_log (expense_id, amount, category, description, paid_by_user_name, sale_run_id) VALUES (:expenseId, :amount, :category, :description, :paidByUserName, :saleRunId)
        """,nativeQuery = true)
    void insertExpenseLog(@Param("expenseId") String expenseId, @Param("saleRunId") String saleRunId, @Param("amount") Double amount, @Param("category") String category, @Param("description") String description, @Param("paidByUserName") String paidByUserName);

   
}

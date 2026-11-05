package com.example.repository;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.entity.SaleRunEntity;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.SupplierDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface CompleteIDRepo extends JpaRepository<SaleRunEntity, String> {
// String Id_complete,
//     String complete_name,
//     String Date_complete,
//     Boolean isActive,
//     String Host_name,
//     List<String> List_Assistants,
    
//     Double Gross_sales,
//     Double Expense_total,
//     Integer Total_item_Expense,
//     Integer Total_deduction,
//     Integer Total_items,
//     Integer Total_sold,
//     Integer Net_total,
//     List<SupplierDTO> List_supplier

// String Id_supplier,
//     Double net_payout,
//     Double gross_sales
    
// ต้องเช็คว่า status = false ด้วย เพราะว่า complete list คือ list ที่ปิดแล้วเท่านั้น
    @Query(value = """
       Query here
    """,nativeQuery = true)
    List<CompleteIDDTO> findCompleteSummaryBySalesId(@Param("sale_id") String sale_id);

// String Id_supplier,
//     String Name_supplier,
//     Double net_payout,
//     Double gross_sales,
//     Double share_expense

    @Query (value = """
       Query here
    """,nativeQuery = true)
    List<SupplierDTO> findCompletePayoutsBySalesId(@Param("sale_id") String sale_id);
// String Expense_id,
//     String Paid_By_User,
//     String Sale_run_id,
//     String Time_Stamp,
//     String Description,
//     String Category,
//     Double Amount
        @Query (value = """
       Query here
    """,nativeQuery = true)
    List<ExpenseLogDTO> findCompleteExpenseLogsBySalesId(@Param("sale_id") String sale_id);

    // String Sale_run_id,
    // String Change_made_id,
    // String Change_made_by,
    // String Details,
    // String Item,
    // String Change_Type,
    // String Time_Stamp

        @Query (value = """
       Query here
    """,nativeQuery = true)
    List<ChangeMadeDTO> findCompleteChangeLogsBySalesId(@Param("sale_id") String sale_id);
    
    // String Sale_logs_Id,
    // String Product_name,
    // String Assistant_name,
    // String Sale_run_id,
    // Double Price,
    // Double Quantity,
    // String Time_Stamp
        @Query (value = """
       Query here
    """,nativeQuery = true)
    List<SaleLogsDTO> findCompleteSaleLogsBySalesId(@Param("sale_id") String sale_id);
        
        @Query (value = """
       Query here  
    """,nativeQuery = true)
    List<SupplierDTO> findCompleteSupplierBySalesId(@Param("sale_id") String sale_id);

    @Query (value = """
       Query here
    """,nativeQuery = true)
    String findCompleteAssistantsBySalesId(@Param("sale_id") String sale_id);

   
}

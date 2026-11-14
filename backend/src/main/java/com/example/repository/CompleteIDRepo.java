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
import com.example.dto.response.Complete.CompleteIDSumDTO;
import java.util.List;

@Repository
public interface CompleteIDRepo extends JpaRepository<SaleRunEntity, String> {

    @Query(value = """
       
SELECT
    sr.sale_run_id AS Id_complete,
    sr.sale_run_name AS complete_name,
    sr.date_closed AS Date_complete,
    sr.sale_run_status AS is_active,

    u.display_name AS Host_name,

    COALESCE(rsp.Gross_sales, 0) AS Gross_sales,
    COALESCE(ex.Expense_total, 0) AS Expense_total,
    COALESCE(ex.Total_item_Expense, 0) AS Total_item_Expense,

    COALESCE(rsp.Total_deduction, 0) AS Total_deduction,
    COALESCE(p.Total_start_stock, 0) AS Total_items,
    COALESCE(rsp.Total_sold, 0) AS Total_sold,
    COALESCE(rsp.Net_total, 0) AS Net_total

FROM sale_run sr

LEFT JOIN users u
    ON u.user_id = sr.host_user_id

LEFT JOIN (
    SELECT
        sale_run_id,
        SUM(gross_sale) AS Gross_sales,
        SUM(stall_deductions) AS Total_deduction,
        SUM(total_item_sold) AS Total_sold,
        SUM(net_payouts) AS Net_total
    FROM run_supplier_payouts
    GROUP BY sale_run_id
) rsp
    ON rsp.sale_run_id = sr.sale_run_id

LEFT JOIN (
    SELECT
        ex.sale_run_id,
        SUM(ex.amount) AS Expense_total,
        COUNT(ex.expense_id) AS Total_item_Expense
    FROM expense_log ex
    GROUP BY ex.sale_run_id
) ex
    ON ex.sale_run_id = sr.sale_run_id

LEFT JOIN (
    SELECT
        sp.sales_run_id AS sale_run_id,
        SUM(p.start_stock) AS Total_start_stock
    FROM supplier sp
    LEFT JOIN product p
        ON p.supplier_id = sp.supplier_id
    GROUP BY sp.sales_run_id
) p
    ON p.sale_run_id = sr.sale_run_id

WHERE sr.sale_run_id = :sale_id AND sr.sale_run_status = 0;

    """,nativeQuery = true)
    CompleteIDSumDTO findCompleteSummaryBySalesId(@Param("sale_id") String sale_id);

// String Id_supplier,
//     String Name_supplier,
//     Double net_payout,
//     Double gross_sales,
//     Double share_expense

    @Query (value = """
 
SELECT
    rsp.supplier_id AS Id_supplier,
    sp.supplier_name AS Name_supplier,
    COALESCE(rsp.net_payouts,0) AS net_payout,
    COALESCE(rsp.gross_sale,0) AS gross_sales,
    COALESCE(ex.share_expense, 0) AS share_expense,
    rsp.is_settled

FROM run_supplier_payouts rsp

LEFT JOIN supplier sp
    ON sp.supplier_id = rsp.supplier_id

LEFT JOIN (
    SELECT
        sale_run_id,
        COALESCE(AVG(amount),0) AS share_expense
    FROM expense_log
    GROUP BY sale_run_id
) ex
    ON ex.sale_run_id = rsp.sale_run_id

WHERE rsp.sale_run_id = :sale_id;


    """,nativeQuery = true)
    List<SupplierDTO> findCompleteSupplierPayoutsBySalesId(@Param("sale_id") String sale_id);

        @Query (value = """

         SELECT expense_id AS Expense_id,paid_by_user_name AS Paid_By_User,sale_run_id AS Sale_run_id,time_stamp AS Time_Stamp,description AS Description,
category AS Category , amount AS Amount FROM `expense_log` WHERE sale_run_id = :sale_id
    """,nativeQuery = true)
    List<ExpenseLogDTO> findCompleteExpenseLogsBySalesId(@Param("sale_id") String sale_id);

    
        @Query (value = """
       SELECT sale_run_id AS Sale_run_id ,change_by_username AS Change_made_by_name,change_history_id AS Change_made_id,details AS Details,action_type AS actionType,run_assistant_name,time_stamp AS Time_Stamp  FROM `changes_history` WHERE sale_run_id = :sale_id
    """,nativeQuery = true)
    List<ChangeMadeDTO> findCompleteChangeLogsBySalesId(@Param("sale_id") String sale_id);

        @Query (value = """
       SELECT sale_logs_id AS Sale_logs_Id,product_name AS Product_name,run_assistant_name AS Assistant_name, sale_run_id AS  Sale_run_id,
total_price AS Price ,quantity_sold AS Quantity,time_stamp AS Time_Stamp,supplier_name AS Supplier_name,product_unit_price AS Unit_price
FROM `sale_logs` WHERE sale_run_id = :sale_id
    """,nativeQuery = true)
    List<SaleLogsDTO> findCompleteSaleLogsBySalesId(@Param("sale_id") String sale_id);
        
    @Query (value = """
SELECT
    u.display_name AS Assistant_name
FROM run_assistance ra
LEFT JOIN users u
    ON u.user_id = ra.user_id
WHERE ra.sales_run_id = :sale_id;
    """,nativeQuery = true)
    List<String> findCompleteAssistantsNameBySalesId(@Param("sale_id") String sale_id);

   
}

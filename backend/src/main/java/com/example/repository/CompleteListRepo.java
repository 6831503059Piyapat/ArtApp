package com.example.repository;


import com.example.dto.response.Complete.CompleteDTO;
import com.example.entity.SaleRunEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.Complete.CompleteListSumDTO;
import com.example.dto.response.Complete.CompleteListDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface CompleteListRepo extends JpaRepository<SaleRunEntity, String> {
// Integer total_run_complete,
//     Integer Total_duration,
//     Double AVG_duration,
//     Integer Total_item_sold,
//     Double Total_Revenue,
//     Double AVG_Revenue,
//     List<CompleteListDTO> List_Complete

//  String Id_sales,
//     String Name_complete,
//     String Host_id,
//     String Date_complete,
//     Integer Total_sold,
//     Double Gross,
//     Double Net_intake
// ต้องเช็คว่า status = false ด้วย เพราะว่า complete list คือ list ที่ปิดแล้วเท่านั้น
    @Query(value = """
 
SELECT
    COUNT(sr.sale_run_id) AS total_run_complete,

    COALESCE(SUM(sl.total_item_sold), 0) AS Total_item_sold,

    COALESCE(SUM(sl.total_revenue), 0) AS Total_Revenue,

    COALESCE(
        SUM(sl.total_revenue) / NULLIF(COUNT(sr.sale_run_id), 0),
        0
    ) AS AVG_Revenue,

    COALESCE(
        SUM(
            TIMESTAMPDIFF(
                MINUTE,
                sr.date_created,
                sr.date_closed
            )
        ),
        0
    ) AS Total_duration,

    COALESCE(
        AVG(
            TIMESTAMPDIFF(
                MINUTE,
                sr.date_created,
                sr.date_closed
            )
        ),
        0
    ) AS AVG_duration

FROM sale_run sr

LEFT JOIN (
    SELECT
        sale_run_id,
        SUM(quantity_sold) AS total_item_sold,
        SUM(total_price) AS total_revenue
    FROM sale_logs
    GROUP BY sale_run_id
) sl ON sr.sale_run_id = sl.sale_run_id

WHERE
    sr.host_user_id = :uid
    AND sr.sale_run_status = FALSE


    """,nativeQuery = true)
     CompleteListSumDTO findCompleteListTotalSumByUserId(@Param("uid") String uid);

    @Query(value =  """
        
SELECT
    sr.sale_run_id AS Id_sales,
    sr.sale_run_name AS Name_complete,
    sr.host_user_id AS Host_id,
    sr.date_closed AS Date_complete,

    COALESCE(sl.total_sold, 0) AS Total_sold,
    COALESCE(sl.gross, 0) AS Gross,

    COALESCE(sl.gross, 0) - COALESCE(el.total_expense, 0) AS Net_intake

FROM sale_run sr

LEFT JOIN (
    SELECT
        sale_run_id,
        SUM(quantity_sold) AS total_sold,
        SUM(total_price) AS gross
    FROM sale_logs
    GROUP BY sale_run_id
) sl ON sr.sale_run_id = sl.sale_run_id

LEFT JOIN (
    SELECT
        sale_run_id,
        SUM(amount) AS total_expense
    FROM expense_log
    GROUP BY sale_run_id
) el ON sr.sale_run_id = el.sale_run_id

WHERE sr.host_user_id = :uid AND sr.sale_run_status = FALSE;

        """,nativeQuery = true)
    List<CompleteListDTO> findCompleteListByUserId(@Param("uid") String uid);
    

   
}

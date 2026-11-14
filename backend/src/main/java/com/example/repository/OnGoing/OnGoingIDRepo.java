package com.example.repository.OnGoing;

import com.example.entity.SaleRunEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.OnGoingID.ProductDTO;
import com.example.dto.response.OnGoingID.SupplierOnGoingDTO;
import com.example.dto.response.OnGoingID.OnGoingSaleDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface OnGoingIDRepo extends JpaRepository<SaleRunEntity, String> {

    @Query(value = """
SELECT
    p.product_id AS Product_Id,
    p.product_name AS Product_Name,
    p.supplier_id AS Supplier_Id,
    s.supplier_name AS Supplier_Name,
    p.product_unit_price AS Product_Unit_Price,
    p.image_url AS Image_url,
    p.start_stock AS Start_Stock,
    p.current_stock AS Current_Stock
FROM
    `product` AS p
INNER JOIN supplier AS s
ON
    p.supplier_id = s.supplier_id
WHERE
    p.supplier_id = :Supplier_Id
     """,nativeQuery = true)
    List<ProductDTO> findProductBySupplierId(@Param("Supplier_Id") String Supplier_Id);
    // String Supplier_Id;
    // String Supplier_Name;
    // String Category;
    // String Host_user_Id;
    // List<ProductDTO> products;

    @Query (value = """
      SELECT supplier_id,supplier_name FROM `supplier` WHERE sales_run_id = :Sale_run_Id
    """,nativeQuery = true)
    List<SupplierOnGoingDTO> findSupplierBySaleRunId(@Param("Sale_run_Id") String Sale_run_Id);

    //  String Sale_run_Id;
    // String Sale_run_Name;
    // Double Gross_sales;
    // Integer Total_Stock;
    // Integer Total_Sale;
  
    @Query (value = """
        SELECT
            sr.sale_run_id AS Sale_run_Id,
            sr.sale_run_name AS Sale_run_Name,
            CAST(COALESCE(SUM(sl.total_price), 0) AS DOUBLE) AS Gross_sales,
            CAST(COALESCE((
                SELECT SUM(p.start_stock)
                FROM supplier s
                JOIN product p ON p.supplier_id = s.supplier_id
                WHERE s.sales_run_id = sr.sale_run_id
            ), 0) AS SIGNED) AS Total_Stock,
            CAST(COALESCE(SUM(sl.quantity_sold), 0) AS SIGNED) AS Total_Sale,
            sr.code_join
        FROM sale_run sr
        LEFT JOIN sale_logs sl ON sl.sale_run_id = sr.sale_run_id
        WHERE sr.sale_run_id = :sales_id
        GROUP BY sr.sale_run_id, sr.sale_run_name
    """,nativeQuery = true)
    OnGoingSaleDTO findOnGoingIDListBySalesId(@Param("sales_id") String sales_id);

    
}

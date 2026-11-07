package com.example.repository.OnGoing;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entity.ProductEntity;



@Repository
public interface ProductLogRepo extends JpaRepository<ProductEntity, String> {

    
    @Query (value = """
        INSERT INTO SaleLogs (Sale_Logs_Id, Supplier_name,Product_Name,Run_Assistance_Name,Sale_run_Id,Product_Unit_Price,Quantity_Sold,Total_Price,Time_Stamp) VALUES (:Sale_Logs_Id, :Supplier_name, :Product_Name, :Run_Assistance_Name, :Sale_run_Id, :Product_Unit_Price, :Quantity_Sold, :Total_Price, :Time_Stamp)
    """,nativeQuery = true)
    void insertProductToLog(
                            @Param("Sale_Logs_Id") String Sale_Logs_Id, 
                            @Param("Supplier_name") String Supplier_name, 
                            @Param("Product_Name") String Product_Name, 
                            @Param("Run_Assistance_Name") String Run_Assistance_Name, 
                            @Param("Sale_run_Id") String Sale_run_Id, 
                            @Param("Product_Unit_Price") Double Product_Unit_Price, 
                            @Param("Quantity_Sold") Integer Quantity_Sold, 
                            @Param("Total_Price") Double Total_Price, 
                            @Param("Time_Stamp") String Time_Stamp);

    
    
}

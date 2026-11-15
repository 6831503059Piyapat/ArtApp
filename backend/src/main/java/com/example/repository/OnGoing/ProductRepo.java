package com.example.repository.OnGoing;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import com.example.dto.response.OnGoingID.OnGoingIDProductDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;
import org.springframework.transaction.annotation.Transactional;
import com.example.dto.response.OnGoingID.ProductDTO;
import com.example.entity.ProductEntity;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, String> {

    
    @Query (value = """
       UPDATE product SET current_stock = current_stock - :amount WHERE product_id = :Product_Id
    """,nativeQuery = true)
    void updateProductQuantity(@Param("Product_Id") String Product_Id, @Param ("amount") Integer amount);

    @Query (value = """
       UPDATE product SET current_stock = :Start_Stock WHERE product_id = :Product_Id
    """,nativeQuery = true)
    void updateProductStartStock(@Param ("Product_Id") String Product_Id, @Param ("Start_Stock") Integer StartStock);
@Modifying
@Transactional
    @Query (value = """
       UPDATE product SET current_stock = start_stock - :current_stock WHERE product_id = :Product_Id
    """,nativeQuery = true)
    void updateProductCurrentStock(@Param ("Product_Id") String Product_Id, @Param ("current_stock") Integer current_stock);

    @Query (value = """
        UPDATE product SET image = :image WHERE product_id = :Product_Id
        """,nativeQuery = true)
    void updateProductImage(@Param ("Product_Id") String Product_Id, @Param ("image") String image);

    @Query (value = """
        UPDATE product SET name = :name WHERE product_id = :Product_Id
        """,nativeQuery = true)
    void updateProductName(@Param ("Product_Id") String Product_Id, @Param ("name") String name);

    @Query (value = """
        UPDATE product SET product_unit_price = :price WHERE product_id = :Product_Id
        """,nativeQuery = true)
    void updateProductPrice(@Param ("Product_Id") String Product_Id, @Param ("price") Double price);

    @Query(value = """
        DELETE FROM product WHERE product_id = :Product_Id
        """, nativeQuery = true)
    void deleteProduct(@Param ("Product_Id") String Product_Id);




    //ADD Product
    @Query (
        value = """
        INSERT INTO product(product_id, supplier_id, product_name, product_unit_price, image_url, start_stock, current_stock) VALUES (:Product_Id,:Supplier_Id,:Product_Name,:Product_Unit_Price,:Image_url,:Start_Stock,:Current_Stock)
        """,nativeQuery = true)
        void addProduct(@Param ("Product_Id") String Product_Id, @Param ("Supplier_Id") String Supplier_Id, @Param ("Product_Name") String Product_Name, @Param ("Product_Unit_Price") Double Product_Unit_Price, @Param ("Image_url") String Image_url, @Param ("Start_Stock") Integer Start_Stock, @Param ("Current_Stock") Integer Current_Stock);
    // Sell Product
        @Query(
        value = """
        INSERT INTO sale_logs(sale_logs_id, product_unit_price,product_name,quantity_sold,run_assistant_name,sale_run_id,supplier_name,time_stamp,total_price,paymentMethod) VALUES (:sale_logs_id,:product_unit_price,:product_name,:quantity_sold,:run_assistant_name,:sale_run_id,:supplier_name,:time_stamp,:total_price,:paymentMethod)
        """,nativeQuery = true)
        void addSaleLog(@Param ("sale_logs_id") String sale_logs_id, @Param ("product_unit_price") Double product_unit_price, @Param ("product_name") String product_name, @Param ("quantity_sold") Integer quantity_sold, @Param ("run_assistant_name") String run_assistant_name, @Param ("sale_run_id") String sale_run_id, @Param ("supplier_name") String supplier_name, @Param ("time_stamp") String time_stamp, @Param ("total_price") Double total_price, @Param ("paymentMethod") String paymentMethod);
    //Edit Product
    @Modifying
    @Transactional
    @Query(
        value = """
        UPDATE product SET product_name = :name, product_unit_price = :price,current_stock = :current_stock, start_stock = :start_stock WHERE product_id = :id
        """,
        nativeQuery = true
    )
    void editProduct(@Param("id") String id, @Param("name") String name, @Param("price") Double price, @Param("current_stock") Integer current_stock, @Param("start_stock") Integer start_stock);
    
    @Modifying 
    @Transactional 
    @Query(
        value = """
        DELETE FROM product WHERE product_id = :id
        """,nativeQuery = true
    )
    void deleteProductById(@Param("id") String id);

    @Modifying 
    @Transactional 
    @Query (
        value = """
        UPDATE product SET current_stock = current_stock - :quantity WHERE product_id = :id
        """,nativeQuery = true
    )
    void SellProduct(@Param("id") String id, @Param("quantity") Integer quantity);
}

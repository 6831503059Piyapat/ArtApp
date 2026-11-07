package com.example.service.OnGoing;



import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.repository.OnGoing.ProductRepo;
import com.example.repository.OnGoing.ProductLogRepo;

@Service
public class ProductManageService {
    private final ProductRepo productRepository;
    private final ProductLogRepo productLogRepository;
    public ProductManageService(ProductRepo productRepository, ProductLogRepo productLogRepository) {
        this.productRepository = productRepository;
        this.productLogRepository = productLogRepository;
    }

    @Transactional(readOnly = true)
    public void updateProductQuantity(String Product_Id, Integer amount) {
        productRepository.updateProductQuantity(Product_Id, amount);
    }
    public void updateProductCurrentStock(String Product_Id, Integer currentStock) {
        productRepository.updateProductCurrentStock(Product_Id, currentStock);
    }
    public void updateProductImage(String Product_Id, String image) {
        productRepository.updateProductImage(Product_Id, image);
    }
    public void updateProductPrice(String Product_Id, Double price) {
        productRepository.updateProductPrice(Product_Id, price);
    }
    public void updateProductName(String Product_Id, String name) {
        productRepository.updateProductName(Product_Id, name);
    }
    public void updateProductStartStock(String Product_Id, Integer startStock) {
        productRepository.updateProductStartStock(Product_Id, startStock);
    }
    public void deleteProduct(String Product_Id) {
        productRepository.deleteProduct(Product_Id);
    }
    public void addProduct(String Product_Id,String Supplier_Id, String Product_Name, Double Product_Unit_Price, String Image_url, Integer Start_Stock, Integer Current_Stock) {
        productRepository.addProduct(Product_Id, Supplier_Id, Product_Name, Product_Unit_Price, Image_url, Start_Stock, Current_Stock);
    
    }







    public void addProductLog(String Sale_Logs_Id, String Supplier_name, String Product_Name,String Run_Assistance_Name,String Sale_run_Id,Double Product_Unit_Price, Integer Quantity_Sold, Double Total_Price, String Time_Stamp) {
        productLogRepository.insertProductToLog( Sale_Logs_Id, Supplier_name, Product_Name, Run_Assistance_Name, Sale_run_Id, Product_Unit_Price, Quantity_Sold, Total_Price, Time_Stamp);
    }

}


    

   
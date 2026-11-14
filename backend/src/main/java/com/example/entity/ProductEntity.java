package com.example.entity;

import jakarta.persistence.*;
import java.util.List;

import org.springframework.data.domain.Persistable;

import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Product")
public class ProductEntity implements Persistable<String> {
    @Id
    @Column(name = "Product_Id")
    private String Product_id;

    @Column(name = "Product_Name", nullable = false)
    private String Product_Name;


    @Column(name="Supplier_Id", nullable = false, insertable = false, updatable = false)
    private String Supplier_id;

    @Column(name = "Product_Unit_Price", nullable = false)
    private double Product_Unit_Price;

    @Column(name ="Image_url", nullable = false)
    private String Image_url;

    @Column(name = "Start_Stock", nullable = false)
    private int Start_Stock;

    @Column(name = "Current_Stock", nullable = false)
    private int Current_Stock;
    @JsonBackReference("Supplier-Products")
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Supplier_Id", referencedColumnName = "Supplier_Id")
    private SupplierEntity Supplier;
 
    // Getters & Setters
    public ProductEntity() {
    }
    public ProductEntity(String Product_id, String Product_Name, String Supplier_id, double price, String Image_url, int start_stock, int current_stock) {
        this.Product_id = Product_id;
        this.Product_Name = Product_Name;
        this.Supplier_id = Supplier_id;
        this.Product_Unit_Price = price;
        this.Image_url = Image_url;
        this.Start_Stock = start_stock;
        this.Current_Stock = current_stock;
    }

    public String getProduct_id() {
        return Product_id;
    }

    @Override
    public String getId() {
        return Product_id;
    }

    @Override
    public boolean isNew() {
        return true;
    }

    public String getProduct_Name() {
        return Product_Name;
    }

    public String getSupplier_id() {
        return Supplier_id;
    }

    public double getPrice() {
        return Product_Unit_Price;
    }

    public String getImage_url() {
        return Image_url;
    }

    public int getStart_stock() {
        return Start_Stock;
    }

    public int getCurrent_stock() {
        return Current_Stock;
    }
    public void setSupplier(SupplierEntity supplier) {
        this.Supplier = supplier;
    }
    public void setProduct_id(String Product_id) {
        this.Product_id = Product_id;
    }
    public void setProduct_Name(String Product_Name) {
        this.Product_Name = Product_Name;
    }
    public void setSupplier_id(String Supplier_id) {
        this.Supplier_id = Supplier_id;
    }
    public void setPrice(double price) {
        this.Product_Unit_Price = price;
    }
    public void setImage_url(String Image_url) {
        this.Image_url = Image_url;
    }
    public void setStart_stock(int start_stock) {
        this.Start_Stock = start_stock;
    }
    public void setCurrent_stock(int current_stock) {
        this.Current_Stock = current_stock;
    }
    public SupplierEntity getSupplier() {
        return Supplier;
    }
    public void setProduct_UnitPrice(double product_Unit_Price) {
        this.Product_Unit_Price = product_Unit_Price;
    }
    public double getProduct_UnitPrice() {
        return Product_Unit_Price;
    }
    public void setStart_Stock(int start_Stock) {
        this.Start_Stock = start_Stock;
    }
    public void setCurrent_Stock(int current_Stock) {
        this.Current_Stock = current_Stock;
    }
    public int getStart_Stock() {
        return Start_Stock;
    }
    public int getCurrent_Stock() {
        return Current_Stock;
    }
    public void setProduct_Unit_Price(double product_Unit_Price) {
        this.Product_Unit_Price = product_Unit_Price;
    }
    public double getProduct_Unit_Price() {
        return Product_Unit_Price;
    }
    public void setImageUrl(String imageUrl) {
        this.Image_url = imageUrl;
    }
    public String getImageUrl() {
        return Image_url;
    }

}

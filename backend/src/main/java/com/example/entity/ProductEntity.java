package com.example.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Product_id")
    private String Product_id;

    @Column(name = "Product_name", nullable = false)
    private String Product_name;

    @Column(name="Supplier_id", nullable = false, insertable = false, updatable = false)
    private String Supplier_id;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name ="Image_url", nullable = false)
    private String Image_url;

    @Column(name = "start_stock", nullable = false)
    private int start_stock;

    @Column(name = "current_stock", nullable = false)
    private int current_stock;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Supplier_id", referencedColumnName = "Supplier_id")
    private SupplierEntity Supplier;
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL ,mappedBy = "Product")
    private List<SaleLogsEntity> SaleLogs = new ArrayList<>();


    // Getters & Setters
    public ProductEntity() {
    }
    public ProductEntity(String Product_id, String Product_name, String Supplier_id, double price, String Image_url, int start_stock, int current_stock) {
        this.Product_id = Product_id;
        this.Product_name = Product_name;
        this.Supplier_id = Supplier_id;
        this.price = price;
        this.Image_url = Image_url;
        this.start_stock = start_stock;
        this.current_stock = current_stock;
    }

    public String getProduct_id() {
        return Product_id;
    }

    public String getProduct_name() {
        return Product_name;
    }

    public String getSupplier_id() {
        return Supplier_id;
    }

    public double getPrice() {
        return price;
    }

    public String getImage_url() {
        return Image_url;
    }

    public int getStart_stock() {
        return start_stock;
    }

    public int getCurrent_stock() {
        return current_stock;
    }
    public void setSupplier(SupplierEntity supplier) {
        this.Supplier = supplier;
    }
    public void setProduct_id(String Product_id) {
        this.Product_id = Product_id;
    }
    public void setProduct_name(String Product_name) {
        this.Product_name = Product_name;
    }
    public void setSupplier_id(String Supplier_id) {
        this.Supplier_id = Supplier_id;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public void setImage_url(String Image_url) {
        this.Image_url = Image_url;
    }
    public void setStart_stock(int start_stock) {
        this.start_stock = start_stock;
    }
    public void setCurrent_stock(int current_stock) {
        this.current_stock = current_stock;
    }
}

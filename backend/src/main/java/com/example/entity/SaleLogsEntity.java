package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Sale_logs")
public class SaleLogsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Sale_logs_id")
    private String Sale_logs_id;
    // Getters & Setters
    @Column(name = "Sale_run_id", nullable = false, insertable = false, updatable = false)
    private String Sale_run_id;
    @Column(name = "Product_id", nullable = false, insertable = false, updatable = false)
    private String Product_id;
    @Column(name = "User_id", nullable = false)
    private String User_id;
    @Column(name = "quantity", nullable = false)
    private int quantity;
    @Column(name = "unit_price", nullable = false)
    private double unit_price;
    @Column(name = "Time_sold", nullable = false)
    private String Time_sold;

    
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_id", referencedColumnName = "Sale_run_id")
    private SaleRunEntity saleRun;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Product_id", referencedColumnName = "Product_id")
    private ProductEntity Product;

    public SaleLogsEntity() {
    }   
    public SaleLogsEntity(String Sale_logs_id, String Sale_run_id, String Product_id) {
        this.Sale_logs_id = Sale_logs_id;
        this.Sale_run_id = Sale_run_id;
        this.Product_id = Product_id;
    }
    public String getSale_logs_id() {
        return Sale_logs_id;
    }
    public void setSale_logs_id(String Sale_logs_id) {
        this.Sale_logs_id = Sale_logs_id;
    }
    public String getSale_run_id() {
        return Sale_run_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }
    public String getProduct_id() {
        return Product_id;
    }
    public void setProduct_id(String Product_id) {
        this.Product_id = Product_id;
    }
    public String getUser_id() {
        return User_id;
    }
    public void setUser_id(String User_id) {
        this.User_id = User_id;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public double getUnit_price() {
        return unit_price;
    }
    public void setUnit_price(double unit_price) {
        this.unit_price = unit_price;
    }
    public String getTime_sold() {
        return Time_sold;
    }
    public void setTime_sold(String Time_sold) {
        this.Time_sold = Time_sold;
    }
    public SaleRunEntity getSaleRun() {
        return saleRun;
    }
    public void setSaleRun(SaleRunEntity saleRun) {
        this.saleRun = saleRun;
    }
}

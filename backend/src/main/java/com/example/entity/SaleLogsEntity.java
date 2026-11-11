package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Sale_logs")
public class SaleLogsEntity implements Persistable<String>{
    @Id
    @Column(name = "Sale_logs_Id")
    private String Sale_logs_id;
     @Transient
    private boolean isNew = true;

    @Override
    public String getId() {
        return Sale_logs_id;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    @PostLoad
    @PostPersist
    public void markNotNew() {
        this.isNew = false;
    }

    // Getters & Setters
    @Column(name = "Sale_run_Id", nullable = false)
    private String Sale_run_id;
    @Column(name = "Product_name", nullable = false)
    private String Product_name;
    @Column(name = "Run_Assistant_Name", nullable = false)
    private String Run_Assistant_Name;
    @Column(name = "Quantity_sold", nullable = false)
    private Integer Quantity_sold;
    @Column(name = "Product_Unit_Price", nullable = false)
    private Double Product_Unit_Price;
    @Column(name = "Time_Stamp", nullable = false)
    private LocalDateTime Time_Stamp;
    @Column(name ="Supplier_Name", nullable = false)
    private String Supplier_Name;
    @Column(name = "Total_Price", nullable = false)
    private Double Total_Price;
  
        @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Sale_run_Id", referencedColumnName = "Sale_run_Id" , insertable = false, updatable = false)
    private SaleRunEntity saleRun;
    

    public SaleLogsEntity() {
    }   
    public SaleLogsEntity(String Sale_logs_id, String Sale_run_id, String Product_name) {
        this.Sale_logs_id = Sale_logs_id;
        this.Sale_run_id = Sale_run_id;
        this.Product_name = Product_name;
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
    public String getProduct_name() {
        return Product_name;
    }
    public void setProduct_name(String Product_name) {
        this.Product_name = Product_name;
    }
    public String getRun_Assistant_Name() {
        return Run_Assistant_Name;
    }
    public void setRun_Assistant_Name(String Run_Assistant_Name) {
        this.Run_Assistant_Name = Run_Assistant_Name;
    }
    public Integer getQuantity() {
        return Quantity_sold;
    }
    public void setQuantity(Integer Quantity_sold) {
        this.Quantity_sold = Quantity_sold;
    }
    public Double getUnit_price() {
        return Product_Unit_Price;
    }
    public void setUnit_price(Double Product_Unit_Price) {
        this.Product_Unit_Price = Product_Unit_Price;
    }
    public LocalDateTime getTime_sold() {
        return Time_Stamp;
    }
    public void setTime_sold(LocalDateTime Time_Stamp) {
        this.Time_Stamp = Time_Stamp;
    }
    public SaleRunEntity getSaleRun() {
        return saleRun;
    }
    public void setSaleRun(SaleRunEntity saleRun) {
        this.saleRun = saleRun;
    }
    public String getSupplier_Name() {
        return Supplier_Name;
    }
    public void setSupplier_Name(String Supplier_Name) {
        this.Supplier_Name = Supplier_Name;
    }

    public Double getTotal_Price() {
        return Total_Price;
    }
    public void setTotal_Price(Double Total_Price) {
        this.Total_Price = Total_Price;
    }
}

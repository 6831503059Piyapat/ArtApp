package com.example.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import org.springframework.data.domain.Persistable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Supplier")
public class SupplierEntity implements Persistable<String> {

    @Id
    @Column(name = "Supplier_Id")
    private String Supplier_id;

    @Column(name = "Supplier_Name", nullable = false)
    private String Supplier_name;

    @Column(name = "Sales_run_Id", nullable = false, insertable = false, updatable = false)
    private String Sales_run_id;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sales_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity SaleRun;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL ,mappedBy = "Supplier")
    private List<ProductEntity> Products = new ArrayList<>();

    // Getters & Setters
    public SupplierEntity() {
    }
    public SupplierEntity(String Supplier_id, String Supplier_name, String Sales_run_id) {
        this.Supplier_id = Supplier_id;
        this.Supplier_name = Supplier_name;
        this.Sales_run_id = Sales_run_id;
    }
    public String getSupplier_id() {
        return Supplier_id;
    }

    @Override
    public String getId() {
        return Supplier_id;
    }

    @Override
    public boolean isNew() {
        return true;
    }

    public void setSaleRun (SaleRunEntity SaleRun) {
        this.SaleRun = SaleRun;
    }
    public SaleRunEntity getSaleRun() {
        return SaleRun;
    }

    public void addProduct(ProductEntity product) {
        this.Products.add(product);
        product.setSupplier(this);
    }

    public List<ProductEntity> getProducts() {
        return Products;
    }

    public void setSupplier_id(String Supplier_id) {
        this.Supplier_id = Supplier_id;
    }

    public String getSupplier_name() {
        return Supplier_name;
    }

    public void setSupplier_name(String Supplier_name) {
        this.Supplier_name = Supplier_name;
    }


    public String getSales_run_id() {
        return Sales_run_id;
    }

    public void setSales_run_id(String Sales_run_id) {
        this.Sales_run_id = Sales_run_id;
    }
}
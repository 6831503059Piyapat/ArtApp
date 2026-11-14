package com.example.dto.System;

import java.math.BigDecimal;

public class SupplierFindDTO {
    private BigDecimal quantity;
    private Double total_products;

    public SupplierFindDTO() {
    }
    public SupplierFindDTO(BigDecimal quantity, Double total_products) {
        this.quantity = quantity;
        this.total_products = total_products;
    }
    public BigDecimal getQuantity() {
        return quantity;
    }
    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }
    public Double getTotal_products() {
        return total_products;
    }
    public void setTotal_products(Double total_products) {
        this.total_products = total_products;
    }

}

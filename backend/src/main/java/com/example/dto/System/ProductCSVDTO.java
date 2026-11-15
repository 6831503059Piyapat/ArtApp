package com.example.dto.System;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public class ProductCSVDTO {
    private String product_name;
    private Double product_unit_price;
    private Integer quantity;
    private String rnu_assistant_name;
    private String payment_method;
    private Double total_price;
    private LocalDateTime timestamp;

    public ProductCSVDTO(String product_name, Double product_unit_price, String rnu_assistant_name, String payment_method, Integer quantity, Double total_price, LocalDateTime rnu_created_at) {
        this.product_name = product_name;
        this.product_unit_price = product_unit_price;
        this.rnu_assistant_name = rnu_assistant_name;
        this.payment_method = payment_method;
        this.total_price = total_price;
        this.timestamp = rnu_created_at;
        this.quantity = quantity;
    }
    public String getProduct_name() {
        return product_name;
    }
    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }
    public Double getProduct_unit_price() {
        return product_unit_price;
    }
    public void setProduct_unit_price(Double product_unit_price) {
        this.product_unit_price = product_unit_price;
    }

    public String getRnu_assistant_name() {
        return rnu_assistant_name;
    }
    public void setRnu_assistant_name(String rnu_assistant_name) {
        this.rnu_assistant_name = rnu_assistant_name;
    }
    public String getPayment_method() {
        return payment_method;
    }
    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }
    public Double getTotal_price() {
        return total_price;
    }
    public void setTotal_price(Double total_price) {
        this.total_price = total_price;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public ProductCSVDTO() {
    }
    
}
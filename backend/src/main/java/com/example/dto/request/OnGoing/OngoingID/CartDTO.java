package com.example.dto.request.OnGoing.OngoingID;

public class CartDTO {
    private String name;
    private Double price;
    private String productId;
    private Integer quantity;
    private Integer stock;
    private String supplierId;
    private String supplierName;

    public CartDTO() {}
    public CartDTO(String name, Double price, String productId, Integer quantity, Integer stock, String supplierId, String supplierName) {
        this.name = name;
        this.price = price;
        this.productId = productId;
        this.quantity = quantity;
        this.stock = stock;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Integer getStock() {
        return stock;
    }
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    public String getSupplierId() {
        return supplierId;
    }
    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
    public String getSupplierName() {
        return supplierName;
    }
    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }
}

package com.example.dto.request.Product;

public class addProductDTO {
    String productName;
    Integer productQuantity;
    Double productPrice;
    String SupplierName;
    String supplierId;
    String AssistantName;
    public addProductDTO() {
    }
    public addProductDTO(String productName, Integer productQuantity, Double productPrice, String SupplierName, String supplierId, String AssistantName) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.SupplierName = SupplierName;
        this.supplierId = supplierId;
        this.AssistantName = AssistantName;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }
    public Double getProductPrice() {
        return productPrice;
    }
    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }
    public String getSupplierName() {
        return SupplierName;
    }
    public void setSupplierName(String supplierName) {
        SupplierName = supplierName;
    }
    public String getSupplierId() {
        return supplierId;
    }
    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
    public String getAssistantName() {
        return AssistantName;
    }
    public void setAssistantName(String assistantName) {
        AssistantName = assistantName;
    }
    

}

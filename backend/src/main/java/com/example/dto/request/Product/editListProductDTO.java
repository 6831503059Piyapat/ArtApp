package com.example.dto.request.Product;

public class editListProductDTO {
    String productId;
    String productName;
    Integer productQuantity;
    Double productPrice;
    String SupplierName;
    String AssistantName;
    public editListProductDTO() {
    }
    public editListProductDTO(String productId, String productName, Integer productQuantity, Double productPrice, String SupplierName, String AssistantName) {
        this.productId = productId;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.SupplierName = SupplierName;
        this.AssistantName = AssistantName;
    }

    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
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

    public String getAssistantName() {
        return AssistantName;
    }
    public void setAssistantName(String assistantName) {
        AssistantName = assistantName;
    }

  
    
}

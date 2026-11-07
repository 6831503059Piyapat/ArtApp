package com.example.dto.request.Product;

public class SellProductDTO {
    private String productId;
    private Integer amountSold;
    private String SupplierName;
    private Double price;
    private String ProductName;
    private String AssistantName;
    private String Sale_run_Id;
    public SellProductDTO() {
    }
    public SellProductDTO(String productId, Integer amountSold, Double price, String ProductName, String AssistantName, String SupplierName, String Sale_run_Id) {
        this.productId = productId;
        this.amountSold = amountSold;
        this.price = price;
        this.ProductName = ProductName;
        this.AssistantName = AssistantName;
        this.SupplierName = SupplierName;
        this.Sale_run_Id = Sale_run_Id;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Integer getAmountSold() {
        return amountSold;
    }
    public void setAmountSold(Integer amountSold) {
        this.amountSold = amountSold;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getProductName() {
        return ProductName;
    }
    public void setProductName(String productName) {
        ProductName = productName;
    }
    public String getAssistantName() {
        return AssistantName;
    }
    public void setAssistantName(String assistantName) {
        AssistantName = assistantName;
    }
    public String getSupplierName() {
        return SupplierName;
    }
    public void setSupplierName(String supplierName) {
        SupplierName = supplierName;
    }
    public String getSale_run_Id() {
        return Sale_run_Id;
    }
    public void setSale_run_Id(String sale_run_Id) {
        Sale_run_Id = sale_run_Id;
    }
    
}

package com.example.dto.request.OnGoing.OngoingID.ProductEdit;
//     type ProductFixStock = {
//   id:string;
//   name:string;
//   stock:number;
//   price:number;
//   supplierId:string;
//   supplierName:string;
//   productId:string;
//   AssistantName:string;

public class ProductFixDTO {
    private String id;
    private String name;
    private Integer stock;
    private Double price;
    private String supplierId;
    private String supplierName;
    private String productId;
    private String AssistantName;
    
    public ProductFixDTO() {
    }
    public ProductFixDTO(String id, String name, Integer stock, Double price, String supplierId, String supplierName, String productId, String AssistantName) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.productId = productId;
        this.AssistantName = AssistantName;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getStock() {
        return stock;
    }
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
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
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public String getAssistantName() {
        return AssistantName;
    }
    public void setAssistantName(String AssistantName) {
        this.AssistantName = AssistantName;
    }
    
}

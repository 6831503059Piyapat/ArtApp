package com.example.dto.request.OnGoing.OngoingID.ProductEdit;
// type ProductDelete = {
//   id: string;
//   productId: string;
//   productname: string;
//   supplierId: string;
//   supplierName: string;
//   AssistantName: string;
// }
public class ProductDeleteDTO {
    private String id;
    private String productId;
    private String productname;
    private String supplierId;
    private String supplierName;
    private String AssistantName;

    public ProductDeleteDTO() {
    }
    public ProductDeleteDTO(String id, String productId, String productname, String supplierId, String supplierName, String AssistantName) {
        this.id = id;
        this.productId = productId;
        this.productname = productname;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.AssistantName = AssistantName;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public String getProductname() {
        return productname;
    }
    public void setProductname(String productname) {
        this.productname = productname;
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
    public String getAssistantName() {
        return AssistantName;
    }
    public void setAssistantName(String AssistantName) {
        this.AssistantName = AssistantName;
    }
    
}

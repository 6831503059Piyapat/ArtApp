package com.example.dto.request.OnGoing.OngoingID.ProductEdit;
// type ProductAdd = {
//   id:string;
//   stock:number;
//   image_url?:string;
//   productname:string;
//   productprice:number;
//   supplierId:string;
// }
public class ProductAddDTO {
    private String id;
    private Integer stock;
    private String image_url;
    private String productname;
    private Double productprice;
    private String supplierId;

    public ProductAddDTO() {
    }
    public ProductAddDTO(String id, Integer stock, String image_url, String productname, Double productprice, String supplierId) {
        this.id = id;
        this.stock = stock;
        this.image_url = image_url;
        this.productname = productname;
        this.productprice = productprice;
        this.supplierId = supplierId;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Integer getStock() {
        return stock;
    }
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    public String getImage_url() {
        return image_url;
    }
    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
    public String getProductname() {
        return productname;
    }
    public void setProductname(String productname) {
        this.productname = productname;
    }
    public Double getProductprice() {
        return productprice;
    }
    public void setProductprice(Double productprice) {
        this.productprice = productprice;
    }
    public String getSupplierId() {
        return supplierId;
    }
    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
    
}

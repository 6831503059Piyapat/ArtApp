package com.example.dto.response.OnGoingID;

public class ProductDTO {

//     products: [
//       {
//       id: '1',
//       name: 'Green Horned Frog',
//       start: 13,
//       stock: 3,
//       price: 150,
//       sold: 10,
//       icon: Leaf,
//       iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
//       supplierId: "host-8466468345"

   private String Product_Id;
   private String Product_Name;
   private String Supplier_Id;
   private String Supplier_Name;
    private Double Product_Unit_Price;
    private String Image_url;
    private Integer Start_Stock;
    private Integer Current_Stock;

     public ProductDTO(
             String productId,
             String productName,
             String supplierId,
             String supplierName,
             Double productUnitPrice,
             String imageUrl,
             Integer startStock,
             Integer currentStock) {
         Product_Id = productId;
         Product_Name = productName;
         Supplier_Id = supplierId;
         Supplier_Name = supplierName;
         Product_Unit_Price = productUnitPrice;
         Image_url = imageUrl;
         Start_Stock = startStock;
         Current_Stock = currentStock;
     }

    public String getProduct_Id() {
        return Product_Id;
    }
    public void setProduct_Id(String product_Id) {
        Product_Id = product_Id;
    }
    public String getProduct_Name() {
        return Product_Name;
    }
    public void setProduct_Name(String product_Name) {
        Product_Name = product_Name;
    }
    public String getSupplier_Id() {
        return Supplier_Id;
    }
    public void setSupplier_Id(String supplier_Id) {
        Supplier_Id = supplier_Id;
    }
    public Double getProduct_Unit_Price() {
        return Product_Unit_Price;
    }
    public void setProduct_Unit_Price(Double product_Unit_Price) {
        Product_Unit_Price = product_Unit_Price;
    }
    public String getImage_url() {
        return Image_url;
    }
    public void setImage_url(String image_url) {
        Image_url = image_url;
    }
    public Integer getStart_Stock() {
        return Start_Stock;
    }
    public void setStart_Stock(Integer start_Stock) {
        Start_Stock = start_Stock;
    }
    public Integer getCurrent_Stock() {
        return Current_Stock;
    }
    public void setCurrent_Stock(Integer current_Stock) {
        Current_Stock = current_Stock;
    }
    public String getSupplier_Name() {
        return Supplier_Name;
    }
    public void setSupplier_Name(String supplier_Name) {
        Supplier_Name = supplier_Name;
    }

}

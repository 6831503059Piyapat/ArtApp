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
    private String Product_Unit_Price;
    private String Image_url;
    private String Start_Stock;
    private String Current_Stock;

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
    public String getProduct_Unit_Price() {
        return Product_Unit_Price;
    }
    public void setProduct_Unit_Price(String product_Unit_Price) {
        Product_Unit_Price = product_Unit_Price;
    }
    public String getImage_url() {
        return Image_url;
    }
    public void setImage_url(String image_url) {
        Image_url = image_url;
    }
    public String getStart_Stock() {
        return Start_Stock;
    }
    public void setStart_Stock(String start_Stock) {
        Start_Stock = start_Stock;
    }
    public String getCurrent_Stock() {
        return Current_Stock;
    }
    public void setCurrent_Stock(String current_Stock) {
        Current_Stock = current_Stock;
    }


}

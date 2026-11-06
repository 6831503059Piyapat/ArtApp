package com.example.dto.response.OnGoingID;
import java.util.List;
public class OnGoingIDProductDTO {

//  {
//     id: "host-8466468345",
//     name: "My Products",
//     role: "Host's inventory",
//     accent: "purple",
//     category: "host",
//     placeholder: "Item Name (e.g. Linen Coaster Set)",

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
//     }]
    String Supplier_Id;
    String Supplier_Name;
    String Category;
    List<ProductDTO> products;

    public String getSupplier_Id() {
        return Supplier_Id;
    }
    public void setSupplier_Id(String supplier_Id) {
        Supplier_Id = supplier_Id;
    }
    public String getSupplier_Name() {
        return Supplier_Name;
    }
    public void setSupplier_Name(String supplier_Name) {
        Supplier_Name = supplier_Name;
    }
    public String getCategory() {
        return Category;
    }
    public void setCategory(String category) {
        Category = category;
    }
    public List<ProductDTO> getProducts() {
        return products;
    }
    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

}

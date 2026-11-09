package com.example.dto.request;
 // const saleList = 
    // [{
    //   accent: "purple",
    //   id: "host-8466468345",
    //   name: "My Products",
    //   placeholder: "Item Name (e.g. Linen Coaster Set)",
    //   products: [
    //     {
    //       id: 1791050351463,
    //       name: "Linen Coaster Set",
    //       owner :'',
    //       price:100,
    //       quantity:85
    //     }
    //   ],
    //   role:'Host'
    // }];
//
import java.util.List;

public class SaleRunSupplierDTO {
    private String accent;
    private String id;
    private String name;
    private String placeholder;
    private List<SaleRunProductDTO> products;
    private String role;
    

    public SaleRunSupplierDTO() {}

    public SaleRunSupplierDTO(String accent, String id, String name,String placeholder, List<SaleRunProductDTO> products, String role) {
        this.accent = accent;
        this.id = id;
        this.name = name;
        this.role = role;
        this.products = products;
        this.placeholder = placeholder;
    }

    public String getAccent() {
        return accent;
    }

    public void setAccent(String accent) {
        this.accent = accent;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<SaleRunProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<SaleRunProductDTO> products) {
        this.products = products;
    }
    public String getPlaceholder() {
        return placeholder;
    }
    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
    }
}
package com.example.dto.request;
 //   products: [
    //     {
    //       id: 1791050351463,
    //       name: "Linen Coaster Set",
    //       owner :'',
    //       price:100,
    //       quantity:85
    //     }
    //   ],
public class SaleRunProductDTO {
    private String id;
    private String name;
    private String owner;
    private Double price;
    private Integer quantity;
    
    

    public SaleRunProductDTO() {}

    public SaleRunProductDTO(String id, String name, Integer quantity, Double price, String owner) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.owner = owner;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
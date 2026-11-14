package com.example.dto.request.OnGoing.OngoingID.Supplier;

public class AddSupplierDTO {
    private String name;

    public AddSupplierDTO() {
    }
    public AddSupplierDTO(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
}

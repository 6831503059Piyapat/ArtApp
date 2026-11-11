package com.example.dto.response.OnGoingID;

public class SupplierOnGoingDTO {
    private String Supplier_Id;
    private String Supplier_Name;
    public SupplierOnGoingDTO() {}
    public SupplierOnGoingDTO(String supplier_Id, String supplier_Name) {
        Supplier_Id = supplier_Id;
        Supplier_Name = supplier_Name;
    }
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
    
}

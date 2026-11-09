package com.example.dto;

public class SupplierToDBDTO {
    private String supplier_id;
    private String sales_run_id;
    private String supplier_name;

    public SupplierToDBDTO() {}
    public SupplierToDBDTO(String supplier_id, String sales_run_id, String supplier_name) {
        this.supplier_id = supplier_id;
        this.sales_run_id = sales_run_id;
        this.supplier_name = supplier_name;
    }
    public String getSupplier_id() {
        return supplier_id;
    }
    public void setSupplier_id(String supplier_id) {
        this.supplier_id = supplier_id;
    }
    public String getSales_run_id() {
        return sales_run_id;
    }
    public void setSales_run_id(String sales_run_id) {
        this.sales_run_id = sales_run_id;
    }
    public String getSupplier_name() {
        return supplier_name;
    }
    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }
    
}

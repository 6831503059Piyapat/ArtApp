package com.example.dto.request;

public class SaleRunExpenseDTO {
    private Integer amount;
    private String category;
    private String id;
    private String name;
    

    public SaleRunExpenseDTO (
        Integer amount,
        String category,
        String id,
        String name
        
    ) {
        this.amount = amount;
        this.name = name;
        this.category = category;
        this.id = id;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
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
    public SaleRunExpenseDTO() {}
    

}

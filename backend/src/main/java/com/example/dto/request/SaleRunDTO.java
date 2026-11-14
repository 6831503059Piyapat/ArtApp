package com.example.dto.request;

  
 import java.time.LocalDateTime;

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
    // const expenseLog = [{
    //   amount:120,
    //   category:""
    // }]

 
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SaleRunDTO {
//    runName: runName,
//         runDate: runDate,
//         runLocation: runLocation,
//         runOwnerId:getAuth().currentUser?.uid,
//         runSections: sections,
//         runExpenses: expenses
    private String runName;
    private LocalDateTime runDate;
    private LocalDateTime runEnd;
    private String runOwnerName;
    private String runLocation;
    private String runOwnerId;
    @JsonProperty("runSections")
    private List<SaleRunSupplierDTO> sections;
    @JsonProperty ("runExpenses")
    private List<SaleRunExpenseDTO> expenses;
    

    public SaleRunDTO(String runName, LocalDateTime runDate, LocalDateTime runEnd, String runLocation, String runOwnerId, List<SaleRunExpenseDTO> expenses, List<SaleRunSupplierDTO> sections, String runOwnerName) {
        this.runName = runName;
        this.runDate = runDate;
        this.runEnd = runEnd;
        this.runLocation = runLocation;
        this.runOwnerId = runOwnerId;
        this.expenses = expenses;
        this.sections = sections;
        this.runOwnerName = runOwnerName;
    }
    public String getRunName() {
        return runName;
    }
    public void setRunName(String runName) {
        this.runName = runName;
    }
    public LocalDateTime getRunDate() {
        return runDate;
    }
    public void setRunDate(LocalDateTime runDate) {
        this.runDate = runDate;
    }
    public String getRunLocation() {
        return runLocation;
    }
    public void setRunLocation(String runLocation) {
        this.runLocation = runLocation;
    }
    public String getRunOwnerId() {
        return runOwnerId;
    }
    public void setRunOwnerId(String runOwnerId) {
        this.runOwnerId = runOwnerId;
    }
    public List<SaleRunSupplierDTO> getSections() {
        return sections;
    }
    public void setSections(List<SaleRunSupplierDTO> sections) {
        this.sections = sections;
    }
    public List<SaleRunExpenseDTO> getExpenses() {
        return expenses;
    }
    public void setExpenses(List<SaleRunExpenseDTO> expenses) {
        this.expenses = expenses;
    }
    public SaleRunDTO() {}
    public String getRunOwnerName() {
        return runOwnerName;
    }
    public void setRunOwnerName(String runOwnerName) {
        this.runOwnerName = runOwnerName;
    }
    public LocalDateTime getRunEnd() {
        return runEnd;
    }
    public void setRunEnd(LocalDateTime runEnd) {
        this.runEnd = runEnd;
    }

}
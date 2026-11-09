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
    private String runDate;
    private String runLocation;
    private String runOwnerId;
    @JsonProperty("runSections")
    private List<SaleRunSupplierDTO> sections;
    @JsonProperty ("runExpenses")
    private List<SaleRunExpenseDTO> expenses;
    

    public SaleRunDTO(String runName, String runDate, String runLocation, String runOwnerId, List<SaleRunExpenseDTO> expenses, List<SaleRunSupplierDTO> sections) {
        this.runName = runName;
        this.runDate = runDate;
        this.runLocation = runLocation;
        this.runOwnerId = runOwnerId;
        this.expenses = expenses;
        this.sections = sections;
    }
    public String getRunName() {
        return runName;
    }
    public void setRunName(String runName) {
        this.runName = runName;
    }
    public String getRunDate() {
        return runDate;
    }
    public void setRunDate(String runDate) {
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

}
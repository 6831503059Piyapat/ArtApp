package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Changes_History")
public class ChangesHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Change_History_Id")
    private String History_id;

    @Column(name = "Sale_run_Id", nullable = false, insertable = false, updatable = false) 
    private String Sale_run_id;

    @Column(name = "Change_by_Username", nullable = false, insertable = false, updatable = false)
    private String Change_by_Username;

    @Column(name = "Run_Assistant_Name", nullable = false, insertable = false, updatable = false)
    private String Run_Assistant_Name;

    @Column(name = "Time_Stamp", nullable = false)
    private String Time_Stamp;
    @Column(name = "Action_Type", nullable = false)
    private String Action_Type;

    @Column(name = "Details", nullable = false)
    private String Details;

   
   
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity SaleRun;
    public ChangesHistoryEntity() {
    }
    public ChangesHistoryEntity(String History_id, String Sale_run_id, String timestamp, String action, String details) {
        this.History_id = History_id;
        this.Sale_run_id = Sale_run_id;
        this.Time_Stamp = timestamp;
        this.Action_Type = action;
        this.Details = details;
    }
    public String getHistory_id() {
        return History_id;
    }
    public void setHistory_id(String History_id) {
        this.History_id = History_id;
    }
    public String getSale_run_id() {
        return Sale_run_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }
    public String getTimestamp() {
        return Time_Stamp;
    }
    public void setTimestamp(String timestamp) {
        this.Time_Stamp = timestamp;
    }
    public String getAction() {
        return Action_Type;
    }
    public void setAction(String action) {
        this.Action_Type = action;
    }
    public String getDetails() {
        return Details;
    }
    public void setDetails(String details) {
        this.Details = details;
    }
  

    
}

package com.example.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonBackReference;
@Entity
@Table(name = "Changes_History")
public class ChangesHistoryEntity  implements Persistable<String> {
    @Id
    @Column(name = "Change_History_Id")
    private String History_id;

    
    @Column(name = "Sale_run_Id", nullable = false, insertable = false, updatable = false) 
    private String Sale_run_id;

    @Column(name = "Change_by_Username", nullable = false, insertable = false, updatable = false)
    private String Change_by_Username;

    @Column(name = "Run_Assistant_Name", nullable = false, insertable = false, updatable = false)
    private String Run_Assistant_Name;

    @Column(name = "Time_Stamp", nullable = false)
    private LocalDateTime Time_Stamp;
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
    public ChangesHistoryEntity(String History_id, String Sale_run_id, String Change_by_Username, String Run_Assistant_Name, LocalDateTime timestamp, String action, String details) {
        this.History_id = History_id;
        this.Sale_run_id = Sale_run_id;
        this.Change_by_Username = Change_by_Username;
        this.Run_Assistant_Name = Run_Assistant_Name;
        this.Time_Stamp = timestamp;
        this.Action_Type = action;
        this.Details = details;
    }
    public String getHistory_id() {
        return History_id;
    }
     @Override
    public String getId() {
        return History_id;
    }

    @Override
    public boolean isNew() {
        return true;
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
    public LocalDateTime getTimestamp() {
        return Time_Stamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
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
    public String getChange_by_Username() {
        return Change_by_Username;
    }
    public void setChange_by_Username(String Change_by_Username) {
        this.Change_by_Username = Change_by_Username;
    }
    public String getRun_Assistant_Name() {
        return Run_Assistant_Name;
    }
    public void setRun_Assistant_Name(String Run_Assistant_Name) {
        this.Run_Assistant_Name = Run_Assistant_Name;
    }

    
}

package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Changes_History")
public class ChangesHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "History_id")
    private String History_id;

    @Column(name = "Sale_run_id", nullable = false, insertable = false, updatable = false) 
    private String Sale_run_id;

    @Column(name = "Changed_by_User_id", nullable = false, insertable = false, updatable = false)
    private String Changed_by_User_id;

    @Column(name = "timestamp", nullable = false)
    private String timestamp;
    @Column(name = "action_type", nullable = false)
    private String action;

    @Column(name = "details", nullable = false)
    private String details;

    @Column(name = "entity_name", nullable = false)
    private String entity_name;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Changed_by_User_id", referencedColumnName = "User_id")
    private UserEntity user;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_id", referencedColumnName = "Sale_run_id")
    private SaleRunEntity SaleRun;
    public ChangesHistoryEntity() {
    }
    public ChangesHistoryEntity(String History_id, String Sale_run_id, String Changed_by_User_id, String timestamp, String action, String details, String entity_name) {
        this.History_id = History_id;
        this.Sale_run_id = Sale_run_id;
        this.Changed_by_User_id = Changed_by_User_id;
        this.timestamp = timestamp;
        this.action = action;
        this.details = details;
        this.entity_name = entity_name;
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
    public String getChanged_by_User_id() {
        return Changed_by_User_id;
    }
    public void setChanged_by_User_id(String Changed_by_User_id) {
        this.Changed_by_User_id = Changed_by_User_id;
    }

    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public String getAction() {
        return action;
    }
    public void setAction(String action) {
        this.action = action;
    }
    public String getDetails() {
        return details;
    }
    public void setDetails(String details) {
        this.details = details;
    }
    public String getEntity_name() {
        return entity_name;
    }
    public void setEntity_name(String entity_name) {
        this.entity_name = entity_name;
    }

    
}

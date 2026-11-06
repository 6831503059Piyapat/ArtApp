package com.example.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Run_Assistance")
public class RunAssistanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Run_Assistance_id")
    private String Assistanceid;
    
    @Column(name = "Sales_run_Id", insertable = false, updatable = false)
    private String Salesrunid;

    @Column(name = "User_Id", insertable = false, updatable = false)
    private String Userid;

    @Column(name = "Can_sell")
    private boolean CanSell;

    @Column(name = "Can_Manage_Stock")
    private boolean CanCrud;

    @Column(name = "Can_Record_Expenses")
    private boolean CanRecordExpenses;

    @Column(name = "Can_View_Log")
    private boolean CanViewLog;

    @Column(name = "Can_Manage_Permission")
    private boolean CanManagePermissions;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sales_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity SaleRun;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "User_Id", referencedColumnName = "User_Id")
    private UserEntity user;

    

    // Getters, Setters, and Constructors
  public RunAssistanceEntity() {
    }

    public RunAssistanceEntity(String assistanceid, String salesrunid, String userid, boolean canSell, boolean canCrud, boolean canRecordExpenses, boolean canViewLog) {
        this.Assistanceid = assistanceid;
        this.Salesrunid = salesrunid;
        this.Userid = userid;
        this.CanSell = canSell;
        this.CanCrud = canCrud;
        this.CanRecordExpenses = canRecordExpenses;
        this.CanViewLog = canViewLog;
    }

    public String getAssistanceid() {
        return Assistanceid;
    }

    public void setAssistanceid(String assistanceid) {
        this.Assistanceid = assistanceid;
    }

    public String getSalesrunid() {
        return Salesrunid;
    }

    public void setSalesrunid(String salesrunid) {
        this.Salesrunid = salesrunid;
    }

    public String getUserid() {
        return Userid;
    }

    public void setUserid(String userid) {
        this.Userid = userid;
    }

    public boolean isCanSell() {
        return CanSell;
    }

    public void setCanSell(boolean canSell) {
        this.CanSell = canSell;
    }

    public boolean isCanCrud() {
        return CanCrud;
    }

    public void setCanCrud(boolean canCrud) {
        this.CanCrud = canCrud;
    }

    public boolean isCanRecordExpenses() {
        return CanRecordExpenses;
    }

    public void setCanRecordExpenses(boolean canRecordExpenses) {
        this.CanRecordExpenses = canRecordExpenses;
    }

    public boolean isCanViewLog() {
        return CanViewLog;
    }

    public void setCanViewLog(boolean canViewLog) {
        this.CanViewLog = canViewLog;
    }

    public boolean isCanManagePermissions() {
        return CanManagePermissions;
    }
    public void setCanManagePermissions(boolean canManagePermissions) {
        this.CanManagePermissions = canManagePermissions;
    }

    public SaleRunEntity getSaleRun() {
        return SaleRun;
    }

    public void setSaleRun(SaleRunEntity saleRun) {
        this.SaleRun = saleRun;
    }

}

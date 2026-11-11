package com.example.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Run_Assistance")
public class RunAssistanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Run_Assistance_id")
    private String assistanceid;
    
    @Column(name = "Sales_run_Id", insertable = false, updatable = false)
    private String salesrunid;

    @Column(name = "User_Id", insertable = false, updatable = false)
    private String userid;

    @Column(name = "Can_sell")
    private boolean canSell;

    @Column(name = "Can_Manage_Stock")
    private boolean canCrud;

    @Column(name = "Can_Record_Expenses")
    private boolean canRecordExpenses;

    @Column(name = "Can_View_Log")
    private boolean canViewLog;

    @Column(name = "Can_Manage_Permission")
    private boolean canManagePermissions;

    @JsonBackReference("saleRun-assistance")
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sales_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity saleRun;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "User_Id", referencedColumnName = "User_Id")
    private UserEntity user;

    

    // Getters, Setters, and Constructors
  public RunAssistanceEntity() {
    }

    public RunAssistanceEntity(String assistanceid, String salesrunid, String userid, boolean canSell, boolean canCrud, boolean canRecordExpenses, boolean canViewLog) {
        this.assistanceid = assistanceid;
        this.salesrunid = salesrunid;
        this.userid = userid;
        this.canSell = canSell;
        this.canCrud = canCrud;
        this.canRecordExpenses = canRecordExpenses;
        this.canViewLog = canViewLog;
    }

    public String getAssistanceid() {
        return assistanceid;
    }

    public void setAssistanceid(String assistanceid) {
        this.assistanceid = assistanceid;
    }

    public String getSalesrunid() {
        return salesrunid;
    }

    public void setSalesrunid(String salesrunid) {
        this.salesrunid = salesrunid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public boolean isCanSell() {
        return canSell;
    }

    public void setCanSell(boolean canSell) {
        this.canSell = canSell;
    }

    public boolean isCanCrud() {
        return canCrud;
    }

    public void setCanCrud(boolean canCrud) {
        this.canCrud = canCrud;
    }

    public boolean isCanRecordExpenses() {
        return canRecordExpenses;
    }

    public void setCanRecordExpenses(boolean canRecordExpenses) {
        this.canRecordExpenses = canRecordExpenses;
    }

    public boolean isCanViewLog() {
        return canViewLog;
    }

    public void setCanViewLog(boolean canViewLog) {
        this.canViewLog = canViewLog;
    }

    public boolean isCanManagePermissions() {
        return canManagePermissions;
    }
    public void setCanManagePermissions(boolean canManagePermissions) {
        this.canManagePermissions = canManagePermissions;
    }

    public SaleRunEntity getSaleRun() {
        return saleRun;
    }

    public void setSaleRun(SaleRunEntity saleRun) {
        this.saleRun = saleRun;
    }

}

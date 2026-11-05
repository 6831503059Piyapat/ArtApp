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
    
    @Column(name = "Sales_run_id", insertable = false, updatable = false)
    private String Salesrunid;

    @Column(name = "User_id", insertable = false, updatable = false)
    private String Userid;

    @Column(name = "Can_sell")
    private boolean CanSell;

    @Column(name = "Can_crud")
    private boolean CanCrud;

    @Column(name = "Can_record_Expenses")
    private boolean CanRecordExpenses;

    @Column(name = "Can_View_Log")
    private boolean CanViewLog;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sales_run_id", referencedColumnName = "Sale_run_id")
    private SaleRunEntity SaleRun;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "User_id", referencedColumnName = "User_id")
    private UserEntity user;
    
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL ,mappedBy = "RunAssistant")
    private List<ExpenseLogEntity> expensesLogs = new ArrayList<>();

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

    public SaleRunEntity getSaleRun() {
        return SaleRun;
    }

    public void setSaleRun(SaleRunEntity saleRun) {
        this.SaleRun = saleRun;
    }

    public List<ExpenseLogEntity> getExpensesLogs() {
        return expensesLogs;
    }

    public void setExpensesLogs(List<ExpenseLogEntity> expensesLogs) {
        this.expensesLogs = expensesLogs;
    }
}

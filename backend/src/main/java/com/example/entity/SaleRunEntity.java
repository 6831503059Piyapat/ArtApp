package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
@Table(name = "SaleRun")
public class SaleRunEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Sale_run_Id")
    private String Sale_run_id;

    @Column(name = "Sale_run_name", nullable = false)
    private String Sale_run_name;

    @Column(name = "Booth_Location", nullable = true)
    private String Sale_run_location;

    @Column(name = "Date_created", nullable = false)
    private LocalDateTime Date_created;

    @Column(name = "Date_closed", nullable = true)
    private LocalDateTime Date_closed;

    @Column (name = "code_join", nullable = false)
    private String code_join;

    @Column(name = "SaleRun_Status", nullable = false)
    private boolean Is_Active;

    @Column(name = "Host_user_Id", nullable = false, insertable = false, updatable = false)
    private String Host_user_Id;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "saleRun",fetch = FetchType.LAZY)
    private List<SaleLogsEntity> saleLogs = new ArrayList<>();
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "SaleRun",fetch = FetchType.LAZY)
    private List<ExpenseLogEntity> expensesLogs = new ArrayList<>();
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "SaleRun",fetch = FetchType.LAZY)
    private List<SupplierEntity> Supplier = new ArrayList<>();
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "saleRun",fetch = FetchType.LAZY)
    private List<RunSupplierPayoutEntity> runSupplierPayouts = new ArrayList<>();
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "SaleRun",fetch = FetchType.LAZY)
    private List<ChangesHistoryEntity> changesHistories = new ArrayList<>();
    @JsonManagedReference("saleRun-assistance")
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "saleRun",fetch = FetchType.LAZY)
    private List<RunAssistanceEntity> runAssistants = new ArrayList<>();
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)   
    @JoinColumn(name = "Host_user_Id", referencedColumnName = "User_Id")
    private UserEntity user;
    // Helper Method

    public void addSupplier(SupplierEntity supplier) {
        this.Supplier.add(supplier);
        supplier.setSaleRun(this);
    }

    public void addExpense(ExpenseLogEntity expense) {
        this.expensesLogs.add(expense);
        expense.setSaleRun(this);
    }

    public List<SupplierEntity> getSuppliers() {
        return Supplier;
    }

    public List<ExpenseLogEntity> getExpensesLogs() {
        return expensesLogs;
    }

    // Getters and Setters

    public SaleRunEntity() {
    }

    public SaleRunEntity(String Sale_run_id, String Sale_run_name, LocalDateTime Date_created, LocalDateTime Date_closed, boolean Is_Active, String Host_user_Id, String code_join) {
        this.Sale_run_id = Sale_run_id;
        this.Sale_run_name = Sale_run_name;
        this.Date_created = Date_created;
        this.Date_closed = Date_closed;
        this.Is_Active = Is_Active;
        this.Host_user_Id = Host_user_Id;
        this.code_join = code_join;
    }



     public void setSale_run_location(String Sale_run_location) {
        this.Sale_run_location = Sale_run_location;
    }
    public String getSale_run_location() {
        return Sale_run_location;
    }
    public String getSale_run_id() {
        return Sale_run_id;
    }

    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }

    public String getSale_run_name() {
        return Sale_run_name;
    }

    public void setSale_run_name(String Sale_run_name) {
        this.Sale_run_name = Sale_run_name;
    }

    public LocalDateTime getDate_created() {
        return Date_created;
    }

    public void setDate_created(LocalDateTime Date_created) {
        this.Date_created = Date_created;
    }

    public LocalDateTime getDate_closed() {
        return Date_closed;
    }

    public void setDate_closed(LocalDateTime Date_closed) {
        this.Date_closed = Date_closed;
    }

    public boolean isIs_Active() {
        return Is_Active;
    }

    public void setIs_Active(boolean Is_Active) {
        this.Is_Active = Is_Active;
    }

    public List<SaleLogsEntity> getSaleLogs() {
        return saleLogs;
    }

   public String getCode_join() {
        return code_join;
    }
    public void setCode_join(String code_join) {
        this.code_join = code_join;
    }

    public void setSaleLogs(List<SaleLogsEntity> saleLogs) {
        this.saleLogs = saleLogs;
    }

    public List<RunSupplierPayoutEntity> getRunSupplierPayouts() {
        return runSupplierPayouts;
    }

    public void setRunSupplierPayouts(List<RunSupplierPayoutEntity> runSupplierPayouts) {
        this.runSupplierPayouts = runSupplierPayouts;
    }

    public List<ChangesHistoryEntity> getChangesHistories() {
        return changesHistories;
    }

    public void setChangesHistories(List<ChangesHistoryEntity> changesHistories) {
        this.changesHistories = changesHistories;
    }

    public List<RunAssistanceEntity> getRunAssistants() {
        return runAssistants;
    }

    public void setRunAssistants(List<RunAssistanceEntity> runAssistants) {
        this.runAssistants = runAssistants;
    }
    public UserEntity getUser() {
        return user;
    }
    public void setUser(UserEntity user) {
        this.user = user;
    }
    public String getHost_user_Id() {
        return Host_user_Id;
    }
    public void setHost_user_Id(String Host_user_Id) {
        this.Host_user_Id = Host_user_Id;
    }

}

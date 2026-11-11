package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Run_Supplier_Payouts")
public class RunSupplierPayoutEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Payout_Id")
    private String payoutId;

    @Column(name = "Sale_run_Id", nullable = false, insertable = false, updatable = false) 
    private String saleRunId;

    @Column(name = "Supplier_Id", nullable = false, insertable = false, updatable = false)
    private String supplierId;

    @Column(name = "Gross_sale", nullable = false)
    private double grossSale;

    @Column(name = "Total_Item_Sold", nullable = false)
    private int totalItemSold;

    @Column(name = "Stall_Deductions", nullable = false)
    private double stallDeductions;

    @Column(name = "Net_Payouts", nullable = false)
    private double netPayouts;

    @Column(name = "Is_Settled", nullable = false)
    private boolean settled;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity saleRun;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Supplier_Id", referencedColumnName = "Supplier_Id")
    private SupplierEntity supplier;

    public RunSupplierPayoutEntity() {
    }
    public RunSupplierPayoutEntity(String Payout_id,String Sale_run_id,String Supplier_id , double Gross_sale, int Total_item_sold, double Stall_deductions, double Net_payout, boolean Is_settled) {
        this.payoutId = Payout_id;
        this.saleRunId = Sale_run_id;
        this.supplierId = Supplier_id;
        this.grossSale = Gross_sale;
        this.totalItemSold = Total_item_sold;
        this.stallDeductions = Stall_deductions;
        this.netPayouts = Net_payout;
        this.settled = Is_settled;
    }
    public String getPayout_id() {
        return payoutId;
    }  
    public String getSale_run_id() {
        return saleRunId;
    }

    public String getSupplier_id() {
        return supplierId;
    }
    public double getGross_sale() {
        return grossSale;
    }
    public int getTotal_item_sold() {
        return totalItemSold;
    }
    public double getStall_deductions() {
        return stallDeductions;
    }
    public double getNet_payout() {
        return netPayouts;
    }
    public boolean getIs_settled() {
        return settled;
    }
    public void setPayout_id(String Payout_id) {
        this.payoutId = Payout_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.saleRunId = Sale_run_id;
    }
    public void setSupplier_id(String Supplier_id) {
        this.supplierId = Supplier_id;
    }
    public void setGross_sale(double Gross_sale) {
        this.grossSale = Gross_sale;
    }
    public void setTotal_item_sold(int Total_item_sold) {
        this.totalItemSold = Total_item_sold;
    }
    public void setStall_deductions(double Stall_deductions) {
        this.stallDeductions = Stall_deductions;
    }
    public void setNet_payout(double Net_payout) {
        this.netPayouts = Net_payout;
    }
    public void setIs_settled(boolean Is_settled) {
        this.settled = Is_settled;
    }
    public SaleRunEntity getSaleRun() {
        return saleRun;
    }
    public SupplierEntity getSupplier() {
        return supplier;
    }
    public void setSaleRun(SaleRunEntity SaleRun) {
        this.saleRun = SaleRun;
    }
    public void setSupplier(SupplierEntity Supplier) {
        this.supplier = Supplier;
    }
}

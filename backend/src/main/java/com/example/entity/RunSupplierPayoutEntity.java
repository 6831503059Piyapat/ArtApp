package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Run_Supplier_Payouts")
public class RunSupplierPayoutEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Payout_Id")
    private String Payout_id;

    @Column(name = "Sale_run_Id", nullable = false, insertable = false, updatable = false) 
    private String Sale_run_Id;

    @Column(name = "Supplier_Id", nullable = false, insertable = false, updatable = false)
    private String Supplier_id;

    @Column(name = "Gross_sale", nullable = false)
    private double Gross_sale;

    @Column(name = "Total_Item_Sold", nullable = false)
    private int Total_Item_Sold;

    @Column(name = "Stall_Deductions", nullable = false)
    private double Stall_Deductions;

    @Column(name = "Net_Payouts", nullable = false)
    private double Net_Payouts;

    @Column(name = "Is_Settled", nullable = false)
    private boolean Is_Settled;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_Id", referencedColumnName = "Sale_run_Id")
    private SaleRunEntity SaleRun;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Supplier_Id", referencedColumnName = "Supplier_Id")
    private SupplierEntity Supplier;

    public RunSupplierPayoutEntity() {
    }
    public RunSupplierPayoutEntity(String Payout_id,String Sale_run_id,String Supplier_id , double Gross_sale, int Total_item_sold, double Stall_deductions, double Net_payout, boolean Is_settled) {
        this.Payout_id = Payout_id;
        this.Sale_run_Id = Sale_run_id;
        this.Supplier_id = Supplier_id;
        this.Gross_sale = Gross_sale;
        this.Total_Item_Sold = Total_item_sold;
        this.Stall_Deductions = Stall_deductions;
        this.Net_Payouts = Net_payout;
        this.Is_Settled = Is_settled;
    }
    public String getPayout_id() {
        return Payout_id;
    }  
    public String getSale_run_id() {
        return Sale_run_Id;
    }

    public String getSupplier_id() {
        return Supplier_id;
    }
    public double getGross_sale() {
        return Gross_sale;
    }
    public int getTotal_item_sold() {
        return Total_Item_Sold;
    }
    public double getStall_deductions() {
        return Stall_Deductions;
    }
    public double getNet_payout() {
        return Net_Payouts;
    }
    public boolean getIs_settled() {
        return Is_Settled;
    }
    public void setPayout_id(String Payout_id) {
        this.Payout_id = Payout_id;
    }
    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_Id = Sale_run_id;
    }
    public void setSupplier_id(String Supplier_id) {
        this.Supplier_id = Supplier_id;
    }
    public void setGross_sale(double Gross_sale) {
        this.Gross_sale = Gross_sale;
    }
    public void setTotal_item_sold(int Total_item_sold) {
        this.Total_Item_Sold = Total_item_sold;
    }
    public void setStall_deductions(double Stall_deductions) {
        this.Stall_Deductions = Stall_deductions;
    }
    public void setNet_payout(double Net_payout) {
        this.Net_Payouts = Net_payout;
    }
    public void setIs_settled(boolean Is_settled) {
        this.Is_Settled = Is_settled;
    }
    public SaleRunEntity getSaleRun() {
        return SaleRun;
    }
    public SupplierEntity getSupplier() {
        return Supplier;
    }
    public void setSaleRun(SaleRunEntity SaleRun) {
        this.SaleRun = SaleRun;
    }
    public void setSupplier(SupplierEntity Supplier) {
        this.Supplier = Supplier;
    }
}

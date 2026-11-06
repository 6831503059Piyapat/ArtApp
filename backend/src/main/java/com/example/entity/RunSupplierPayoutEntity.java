package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Run_Supplier_Payouts")
public class RunSupplierPayoutEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Payout_id")
    private String Payout_id;

    @Column(name = "Sale_run_id", nullable = false, insertable = false, updatable = false) 
    private String Sale_run_id;

    @Column(name = "Supplier_id", nullable = false, insertable = false, updatable = false)
    private String Supplier_id;

    @Column(name = "Gross_sale", nullable = false)
    private double Gross_sale;

    @Column(name = "Total_item_sold", nullable = false)
    private int Total_item_sold;

    @Column(name = "Stall_deductions", nullable = false)
    private double Stall_deductions;

    @Column(name = "Net_payout", nullable = false)
    private double Net_payout;

    @Column(name = "Is_settled", nullable = false)
    private boolean Is_settled;

    @Column(name = "settled_by_user_id", nullable = false)
    private String settled_by_user_id;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Sale_run_id", referencedColumnName = "Sale_run_id")
    private SaleRunEntity SaleRun;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
    @JoinColumn(name = "Supplier_id", referencedColumnName = "Supplier_id")
    private SupplierEntity Supplier;

    public RunSupplierPayoutEntity() {
    }
    public RunSupplierPayoutEntity(String Payout_id,String Sale_run_id,String Supplier_id , double Gross_sale, int Total_item_sold, double Stall_deductions, double Net_payout, boolean Is_settled, String settled_by_user_id) {
        this.Payout_id = Payout_id;
        this.Sale_run_id = Sale_run_id;
        this.Supplier_id = Supplier_id;
        this.Gross_sale = Gross_sale;
        this.Total_item_sold = Total_item_sold;
        this.Stall_deductions = Stall_deductions;
        this.Net_payout = Net_payout;
        this.Is_settled = Is_settled;
        this.settled_by_user_id = settled_by_user_id;
    }
}

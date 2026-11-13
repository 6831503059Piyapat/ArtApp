package com.example.dto.response.Complete;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;
// {
// total _run_complete:number;
// Total_duration:number;
// AVG_duration:number;
// Total_item_sold:number;
// Total_Revenue:number;
// AVG_Revenue:number;
// List_Complete:{
// Id_sales:string;
// Date_complete:string;
// Total_sold:number;
// Gross:number;
// Net_intake:number;
// }[];
// }

public class CompleteListDTO {
    private String Id_sales;
    private String Name_complete;
    private String Host_id;
    private LocalDateTime Date_complete;
    private BigDecimal Total_sold;
    private Double Gross;
    private Double Net_intake;

    public CompleteListDTO() {}

    public CompleteListDTO(String Id_sales, String Name_complete, String Host_id, LocalDateTime Date_complete, BigDecimal Total_sold, Double Gross, Double Net_intake) {
        this.Id_sales = Id_sales;
        this.Name_complete = Name_complete;
        this.Host_id = Host_id;
        this.Date_complete = Date_complete;
        this.Total_sold = Total_sold;
        this.Gross = Gross;
        this.Net_intake = Net_intake;
    }

    // Getters and setters
    public String getId_sales() {
        return Id_sales;
    }

    public void setId_sales(String Id_sales) {
        this.Id_sales = Id_sales;
    }

    public String getName_complete() {
        return Name_complete;
    }

    public void setName_complete(String Name_complete) {
        this.Name_complete = Name_complete;
    }

    public String getHost_id() {
        return Host_id;
    }

    public void setHost_id(String Host_id) {
        this.Host_id = Host_id;
    }

    public LocalDateTime getDate_complete() {
        return Date_complete;
    }

    public void setDate_complete(LocalDateTime Date_complete) {
        this.Date_complete = Date_complete;
    }

    public BigDecimal getTotal_sold() {
        return Total_sold;
    }

    public void setTotal_sold(BigDecimal Total_sold) {
        this.Total_sold = Total_sold;
    }

    public Double getGross() {
        return Gross;
    }

    public void setGross(Double Gross) {
        this.Gross = Gross;
    }

    public Double getNet_intake() {
        return Net_intake;
    }

    public void setNet_intake(Double Net_intake) {
        this.Net_intake = Net_intake;
    }
}
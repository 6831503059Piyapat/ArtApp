package com.example.dto.response.Complete;
import java.math.BigDecimal;
import java.util.List;
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

// 
public class CompleteDTO {



    private Long total_run_complete;
    private BigDecimal Total_duration;
    private BigDecimal AVG_duration;
    private BigDecimal Total_item_sold;
    private Double Total_Revenue;
    private BigDecimal clearance_rate;
    private Double AVG_Revenue;
    private List<CompleteListDTO> List_Complete;

    public CompleteDTO() {
    }
    public void setTotal_run_complete(Long total_run_complete) {
        this.total_run_complete = total_run_complete;
    }
    public void setTotal_duration(BigDecimal total_duration) {
        this.Total_duration = total_duration;
    }
    public void setAVG_duration(BigDecimal AVG_duration) {
        this.AVG_duration = AVG_duration;
    }
    public void setTotal_item_sold(BigDecimal total_item_sold) {
        this.Total_item_sold = total_item_sold;
    }
    public void setTotal_Revenue(Double total_Revenue) {
        this.Total_Revenue = total_Revenue;
    }
    public void setAVG_Revenue(Double AVG_Revenue) {
        this.AVG_Revenue = AVG_Revenue;
    }
    public void setCompleteList(List<CompleteListDTO> completeList) {
        this.List_Complete = completeList;
    }
    public Long getTotal_run_complete() {
        return total_run_complete;
    }
    public BigDecimal getTotal_duration() {
        return Total_duration;
    }
    public BigDecimal getAVG_duration() {
        return AVG_duration;
    }
    public BigDecimal getTotal_item_sold() {
        return Total_item_sold;
    }
    public Double getTotal_Revenue() {
        return Total_Revenue;
    }
    public Double getAVG_Revenue() {
        return AVG_Revenue;
    }
    public List<CompleteListDTO> getCompleteList() {
        return List_Complete;
    }
    public BigDecimal getClearance_rate() {
        return clearance_rate;
    }
    public void setClearance_rate(BigDecimal clearance_rate) {
        this.clearance_rate = clearance_rate;
    }

}
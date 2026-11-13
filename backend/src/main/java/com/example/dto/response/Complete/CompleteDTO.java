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
    private Double AVG_duration;
    private Double Total_item_sold;
    private BigDecimal Total_Revenue;
    private BigDecimal AVG_Revenue;
    private List<CompleteListDTO> List_Complete;

    public CompleteDTO() {
    }
    public void setTotal_run_complete(Long total_run_complete) {
        this.total_run_complete = total_run_complete;
    }
    public void setTotal_duration(BigDecimal total_duration) {
        this.Total_duration = total_duration;
    }
    public void setAVG_duration(Double AVG_duration) {
        this.AVG_duration = AVG_duration;
    }
    public void setTotal_item_sold(Double total_item_sold) {
        this.Total_item_sold = total_item_sold;
    }
    public void setTotal_Revenue(BigDecimal total_Revenue) {
        this.Total_Revenue = total_Revenue;
    }
    public void setAVG_Revenue(BigDecimal AVG_Revenue) {
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
    public Double getAVG_duration() {
        return AVG_duration;
    }
    public Double getTotal_item_sold() {
        return Total_item_sold;
    }
    public BigDecimal getTotal_Revenue() {
        return Total_Revenue;
    }
    public BigDecimal getAVG_Revenue() {
        return AVG_Revenue;
    }
    public List<CompleteListDTO> getCompleteList() {
        return List_Complete;
    }

}
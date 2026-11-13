package com.example.dto.response.Complete;

import java.math.BigDecimal;

public class CompleteListSumDTO {
    private Long total_run_complete;
    private BigDecimal Total_duration;
    private Double AVG_duration;
    private Double Total_item_sold;
    private BigDecimal Total_Revenue;
    private BigDecimal AVG_Revenue;

    public CompleteListSumDTO(Long total_run_complete, BigDecimal total_duration, Double AVG_duration, Double total_item_sold, BigDecimal total_Revenue, BigDecimal AVG_Revenue) {
        this.total_run_complete = total_run_complete;
        Total_duration = total_duration;
        this.AVG_duration = AVG_duration;
        this.Total_item_sold = total_item_sold;
        Total_Revenue = total_Revenue;
        this.AVG_Revenue = AVG_Revenue;
    }
    public Long getTotal_run_complete() {
        return total_run_complete;
    }
    public void setTotal_run_complete(Long total_run_complete) {
        this.total_run_complete = total_run_complete;
    }
    public BigDecimal getTotal_duration() {
        return Total_duration;
    }
    public void setTotal_duration(BigDecimal total_duration) {
        Total_duration = total_duration;
    }
    public Double getAVG_duration() {
        return AVG_duration;
    }
    public void setAVG_duration(Double AVG_duration) {
        this.AVG_duration = AVG_duration;
    }
    public Double getTotal_item_sold() {
        return Total_item_sold;
    }
    public void setTotal_item_sold(Double total_item_sold) {
        Total_item_sold = total_item_sold;
    }
    public BigDecimal getTotal_Revenue() {
        return Total_Revenue;
    }
    public void setTotal_Revenue(BigDecimal total_Revenue) {
        Total_Revenue = total_Revenue;
    }
    public BigDecimal getAVG_Revenue() {
        return AVG_Revenue;
    }
    public void setAVG_Revenue(BigDecimal AVG_Revenue) {
        this.AVG_Revenue = AVG_Revenue;
    }
    public CompleteListSumDTO() {
    }
    
}

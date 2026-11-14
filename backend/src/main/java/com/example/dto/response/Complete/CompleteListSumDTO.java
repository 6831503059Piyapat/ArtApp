package com.example.dto.response.Complete;

import java.math.BigDecimal;

public class CompleteListSumDTO {
    private Long total_run_complete;
    private BigDecimal Total_duration;
    private BigDecimal AVG_duration;
    private BigDecimal Total_item_sold;
    private BigDecimal clearance_rate;
    private Double Total_Revenue;
    private Double AVG_Revenue;
    
    public CompleteListSumDTO(Long total_run_complete, BigDecimal total_item_sold, Double total_Revenue,BigDecimal clearance_rate, Double AVG_Revenue, BigDecimal total_duration, BigDecimal AVG_duration) {
        this.total_run_complete = total_run_complete;
        Total_duration = total_duration;
        this.AVG_duration = AVG_duration;
        this.Total_item_sold = total_item_sold;
        Total_Revenue = total_Revenue;
        this.AVG_Revenue = AVG_Revenue;
        this.clearance_rate = clearance_rate;
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
    public BigDecimal getAVG_duration() {
        return AVG_duration;
    }
    public void setAVG_duration(BigDecimal AVG_duration) {
        this.AVG_duration = AVG_duration;
    }
    public BigDecimal getTotal_item_sold() {
        return Total_item_sold;
    }
    public void setTotal_item_sold(BigDecimal total_item_sold) {
        Total_item_sold = total_item_sold;
    }
    public Double getTotal_Revenue() {
        return Total_Revenue;
    }
    public void setTotal_Revenue(Double total_Revenue) {
        Total_Revenue = total_Revenue;
    }
    public Double getAVG_Revenue() {
        return AVG_Revenue;
    }
    public void setAVG_Revenue(Double AVG_Revenue) {
        this.AVG_Revenue = AVG_Revenue;
    }
    public CompleteListSumDTO() {
    }
    
    public BigDecimal getClearance_rate() {
        return clearance_rate;
    }
    public void setClearance_rate(BigDecimal clearance_rate) {
        this.clearance_rate = clearance_rate;
    }
}

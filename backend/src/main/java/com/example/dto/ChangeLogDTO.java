package com.example.dto;
import java.time.LocalDateTime;
public class ChangeLogDTO {
    private String action;
    private String details;
    private LocalDateTime timestamp;
    private String saleRunId;
    private String change_by_userName;
    private String run_assistant_name;

    public ChangeLogDTO() {
    }
    public ChangeLogDTO(String action, String details, LocalDateTime timestamp, String saleRunId, String change_by_userName, String run_assistant_name) {
        this.action = action;
        this.details = details;
        this.timestamp = timestamp;
        this.saleRunId = saleRunId;
        this.change_by_userName = change_by_userName;
        this.run_assistant_name = run_assistant_name;
    }
    public String getAction() {
        return action;
    }
    public void setAction(String action) {
        this.action = action;
    }
    public String getDetails() {
        return details;
    }
    public void setDetails(String details) {
        this.details = details;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    public String getSaleRunId() {
        return saleRunId;
    }
    public void setSaleRunId(String saleRunId) {
        this.saleRunId = saleRunId;
    }
    public String getChange_by_userName() {
        return change_by_userName;
    }
    public void setChange_by_userName(String change_by_userName) {
        this.change_by_userName = change_by_userName;
    }
    public String getRun_assistant_name() {
        return run_assistant_name;
    }
    public void setRun_assistant_name(String run_assistant_name) {
        this.run_assistant_name = run_assistant_name;
    }
    
}

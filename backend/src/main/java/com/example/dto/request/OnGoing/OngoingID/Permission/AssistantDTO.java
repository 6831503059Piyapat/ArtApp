package com.example.dto.request.OnGoing.OngoingID.Permission;

public class AssistantDTO {
    private String run_assistace_id;
    private Boolean can_view_log;
    private Boolean can_manage_stock;
    private Boolean can_record_expenses;
    private Boolean can_manage_permission;
    private Boolean can_sell;
    
    public AssistantDTO() {
    }
    public AssistantDTO(String run_assistace_id, Boolean can_view_log, Boolean can_manage_stock, Boolean can_record_expenses, Boolean can_manage_permission, Boolean can_sell) {
        this.run_assistace_id = run_assistace_id;
        this.can_view_log = can_view_log;
        this.can_manage_stock = can_manage_stock;
        this.can_record_expenses = can_record_expenses;
        this.can_manage_permission = can_manage_permission;
        this.can_sell = can_sell;
    }
    public String getRun_assistace_id() {
        return run_assistace_id;
    }
    public void setRun_assistace_id(String run_assistace_id) {
        this.run_assistace_id = run_assistace_id;
    }
    public Boolean getCan_view_log() {
        return can_view_log;
    }
    public void setCan_view_log(Boolean can_view_log) {
        this.can_view_log = can_view_log;
    }
    public Boolean getCan_manage_stock() {
        return can_manage_stock;
    }
    public void setCan_manage_stock(Boolean can_manage_stock) {
        this.can_manage_stock = can_manage_stock;
    }
    public Boolean getCan_record_expenses() {
        return can_record_expenses;
    }
    public void setCan_record_expenses(Boolean can_record_expenses) {
        this.can_record_expenses = can_record_expenses;
    }
    public Boolean getCan_manage_permission() {
        return can_manage_permission;
    }
    public void setCan_manage_permission(Boolean can_manage_permission) {
        this.can_manage_permission = can_manage_permission;
    }
    public Boolean getCan_sell() {
        return can_sell;
    }
    public void setCan_sell(Boolean can_sell) {
        this.can_sell = can_sell;
    }
    
    

}

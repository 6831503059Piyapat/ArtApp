package com.example.dto.request.Assistant;

public class AssistantReqDTO {
    private String assistantId;
    private Boolean can_manage_stock;
    private Boolean can_manage_permission;
    private Boolean can_record_expenses;
    private Boolean can_sell;
    private Boolean can_view_log;

    public AssistantReqDTO() {
    }
    public AssistantReqDTO(String assistantId, Boolean can_manage_stock, Boolean can_manage_permission, Boolean can_record_expenses, Boolean can_sell, Boolean can_view_log) {
        this.assistantId = assistantId;
        this.can_manage_stock = can_manage_stock;
        this.can_manage_permission = can_manage_permission;
        this.can_record_expenses = can_record_expenses;
        this.can_sell = can_sell;
        this.can_view_log = can_view_log;
    }
    public String getAssistantId() {
        return assistantId;
    }
    public void setAssistantId(String assistantId) {
        this.assistantId = assistantId;
    }
    public Boolean getCan_manage_stock() {
        return can_manage_stock;
    }
    public void setCan_manage_stock(Boolean can_manage_stock) {
        this.can_manage_stock = can_manage_stock;
    }
    public Boolean getCan_manage_permission() {
        return can_manage_permission;
    }

    public void setCan_manage_permission(Boolean can_manage_permission) {
        this.can_manage_permission = can_manage_permission;
    }
    public Boolean getCan_record_expenses() {
        return can_record_expenses;
    }
    public void setCan_record_expenses(Boolean can_record_expenses) {
        this.can_record_expenses = can_record_expenses;
    }
    public Boolean getCan_sell() {
        return can_sell;
    }
    public void setCan_sell(Boolean can_sell) {
        this.can_sell = can_sell;
    }
    public Boolean getCan_view_log() {
        return can_view_log;
    }
    public void setCan_view_log(Boolean can_view_log) {
        this.can_view_log = can_view_log;
    }
    
}

package com.example.dto.response.ChangeMade;
import java.time.LocalDateTime;
public class ChangeMadeDTO {
    private String Sale_run_id;
    private String Change_made_id;
    private String Change_made_by_name;
    private String Details;
    private String actionType;
    private String run_assistant_name;
    private LocalDateTime Time_Stamp;

    public ChangeMadeDTO() {
    }

    public ChangeMadeDTO(String Sale_run_id, String Change_made_id, String Change_made_by, String Details, String Item, String Change_Type, LocalDateTime Time_Stamp) {
        this.Sale_run_id = Sale_run_id;
        this.Change_made_id = Change_made_id;
        this.Change_made_by_name = Change_made_by;
        this.Details = Details;
        this.actionType = Item;
        this.run_assistant_name = Change_Type;
        this.Time_Stamp = Time_Stamp;
    }

    public String getSale_run_id() {
        return Sale_run_id;
    }

    public void setSale_run_id(String Sale_run_id) {
        this.Sale_run_id = Sale_run_id;
    }

    public String getChange_made_id() {
        return Change_made_id;
    }

    public void setChange_made_id(String Change_made_id) {
        this.Change_made_id = Change_made_id;
    }

    public String getChange_made_by_name() {
        return Change_made_by_name;
    }

    public void setChange_made_by_name(String Change_made_by_name) {
        this.Change_made_by_name = Change_made_by_name;
    }

    public String getDetails() {
        return Details;
    }

    public void setDetails(String Details) {
        this.Details = Details;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getRun_assistant_name() {
        return run_assistant_name;
    }

    public void setRun_assistant_name(String run_assistant_name) {
        this.run_assistant_name = run_assistant_name;
    }

    public LocalDateTime getTime_Stamp() {
        return Time_Stamp;
    }

    public void setTime_Stamp(LocalDateTime Time_Stamp) {
        this.Time_Stamp = Time_Stamp;
    }
}
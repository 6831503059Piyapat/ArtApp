package com.example.dto.response.Live;

import java.time.LocalDateTime;

public class LiveTitleDTO {
    private String Sale_run_Id;
    private String Sale_run_Name;
    private LocalDateTime Date_Created;

    public LiveTitleDTO() {
    }
    public LiveTitleDTO(String Sale_run_Id, String Sale_run_Name, LocalDateTime Date_Created) {
        this.Sale_run_Id = Sale_run_Id;
        this.Sale_run_Name = Sale_run_Name;
        this.Date_Created = Date_Created;
    }
    public String getSale_run_Id() {
        return Sale_run_Id;
    }
    public void setSale_run_Id(String Sale_run_Id) {
        this.Sale_run_Id = Sale_run_Id;
    }
    public String getSale_run_Name() {
        return Sale_run_Name;
    }
    public void setSale_run_Name(String Sale_run_Name) {
        this.Sale_run_Name = Sale_run_Name;
    }
    public LocalDateTime getDateCreated() {
        return Date_Created;
    }
    public void setDateCreated(LocalDateTime Date_Created) {
        this.Date_Created = Date_Created;
    }
}

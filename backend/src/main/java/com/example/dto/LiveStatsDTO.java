package com.example.dto;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
public class LiveStatsDTO {
    private String LiveID;
    private String saleRunName;
    private LocalDateTime dateCreated;
    private List<SaleLogsDTO> saleLogs;
    private List<SupplierLiveDTO> Supplier;
    private String timestamp;

    public LiveStatsDTO() {
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")); 
       }

    
    
    public List<SaleLogsDTO> getSaleLogs() {
        return saleLogs;
    }
    public void setSaleLogs(List<SaleLogsDTO> saleLogs) {
        this.saleLogs = saleLogs;
    }

    public List<SupplierLiveDTO> getSupplier() {
        return Supplier;
    }
    public void setSupplier(List<SupplierLiveDTO> Supplier) {
        this.Supplier = Supplier;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public String getLiveID(){
        return LiveID;
    }
    public void setLiveID(String liveID){
        this.LiveID = liveID;
    }
    public String getSaleRunName() {
        return saleRunName;
    }
    public void setSaleRunName(String saleRunName) {
        this.saleRunName = saleRunName;
    }
    public LocalDateTime getDateCreated() {
        return dateCreated;
    }
    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }
}

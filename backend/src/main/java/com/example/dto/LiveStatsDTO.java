package com.example.dto;
import java.util.List;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
public class LiveStatsDTO {
    private List<SaleLogsDTO> saleLogs;
    private List<SupplierLiveDTO> Supplier;

    public LiveStatsDTO(List<SaleLogsDTO> saleLogs, List<SupplierLiveDTO> Supplier) {
        this.saleLogs = saleLogs;
        this.Supplier = Supplier;
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
}

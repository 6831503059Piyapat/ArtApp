package com.example.dto.request.SaleRun;

public class SaleRunEndDTO {
    private String saleRunId;
    private String assistanceName;
    public SaleRunEndDTO() {
    }
    public SaleRunEndDTO(String saleRunId, String assistanceName) {
        this.saleRunId = saleRunId;
        this.assistanceName = assistanceName;
    }
    public String getSaleRunId() {
        return saleRunId;
    }
    public void setSaleRunId(String saleRunId) {
        this.saleRunId = saleRunId;
    }


    public String getAssistanceName() {
        return assistanceName;
    }
    public void setAssistanceName(String assistanceName) {
        this.assistanceName = assistanceName;
    }
}

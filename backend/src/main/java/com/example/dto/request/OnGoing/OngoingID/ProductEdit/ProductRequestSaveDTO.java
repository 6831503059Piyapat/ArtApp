package com.example.dto.request.OnGoing.OngoingID.ProductEdit;
 // saleRunId: id,
    //   assistanceName: AssistantName,
    //   fixStock: ProductsFixStock,
    //   add: ProductsAdd,
    //   delete: ProductsDelete,
import java.util.List;

public class ProductRequestSaveDTO {
    private String saleRunId;
    private String assistanceName;
    private List<ProductFixDTO> fixStock;
    private List<ProductAddDTO> add;
    private List<ProductDeleteDTO> delete;

    public ProductRequestSaveDTO() {
    }
    public ProductRequestSaveDTO(String saleRunId, String assistanceName, List<ProductFixDTO> fixStock, List<ProductAddDTO> add, List<ProductDeleteDTO> delete) {
        this.saleRunId = saleRunId;
        this.assistanceName = assistanceName;
        this.fixStock = fixStock;
        this.add = add;
        this.delete = delete;
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
    public List<ProductFixDTO> getFixStock() {
        return fixStock;
    }
    public void setFixStock(List<ProductFixDTO> fixStock) {
        this.fixStock = fixStock;
    }
    public List<ProductAddDTO> getAdd() {
        return add;
    }
    public void setAdd(List<ProductAddDTO> add) {
        this.add = add;
    }
    public List<ProductDeleteDTO> getDelete() {
        return delete;
    }
    public void setDelete(List<ProductDeleteDTO> delete) {
        this.delete = delete;
    }
    

}

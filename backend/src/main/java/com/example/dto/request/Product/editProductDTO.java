package com.example.dto.request.Product;
import java.util.List;
import com.example.dto.request.Product.addProductDTO;
public class editProductDTO {
    String sale_run_Id;
    List<editListProductDTO> editListProductDTOList;
    List<addProductDTO> addProductDTOList;
    public editProductDTO() {
    }
    public editProductDTO(List<editListProductDTO> editListProductDTOList, List<addProductDTO> addProductDTOList, String sale_run_Id) {
        this.editListProductDTOList = editListProductDTOList;
        this.addProductDTOList = addProductDTOList;
        this.sale_run_Id = sale_run_Id;
    }

    public List<editListProductDTO> getEditListProductDTOList() {
        return editListProductDTOList;
    }
    public void setEditListProductDTOList(List<editListProductDTO> editListProductDTOList) {
        this.editListProductDTOList = editListProductDTOList;
    }

    public List<addProductDTO> getAddProductDTOList() {
        return addProductDTOList;
    }
    public void setAddProductDTOList(List<addProductDTO> addProductDTOList) {
        this.addProductDTOList = addProductDTOList;
    }

    public String getSale_run_Id() {
        return sale_run_Id;
    }
    public void setSale_run_Id(String sale_run_Id) {
        this.sale_run_Id = sale_run_Id;
    }


}

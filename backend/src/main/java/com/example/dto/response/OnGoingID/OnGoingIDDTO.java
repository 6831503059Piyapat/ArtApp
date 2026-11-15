package com.example.dto.response.OnGoingID;
import java.util.List;
import com.example.dto.response.Assistant.AssistantDTO;
import com.example.dto.response.Assistant.AssistantPermissionCheckDTO;
public class OnGoingIDDTO {

//  {
//     id: "host-8466468345",
//     name: "My Products",
//     role: "Host's inventory",
//     accent: "purple",
//     category: "host",
//     placeholder: "Item Name (e.g. Linen Coaster Set)",

//     products: [
//       {
//       id: '1',
//       name: 'Green Horned Frog',
//       start: 13,
//       stock: 3,
//       price: 150,
//       sold: 10,
//       icon: Leaf,
//       iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
//       supplierId: "host-8466468345"
//     }]

    String Sale_run_Id;
    String Sale_run_Name;
    Double Gross_sales;
    String Join_code;
    List<AssistantDTO> Run_Assistant_Name;
    Long Total_Stock;
    Long Total_Sale;
    AssistantPermissionCheckDTO Permission;
    List<String> Supplier_Name;
    List<OnGoingIDProductDTO> Supplier;

    public String getSale_run_Id() {
        return Sale_run_Id;
    }
    public void setSale_run_Id(String sale_run_Id) {
        Sale_run_Id = sale_run_Id;
    }
    public String getSale_run_Name() {
        return Sale_run_Name;
    }
    public void setSale_run_Name(String sale_run_Name) {
        Sale_run_Name = sale_run_Name;
    }
    public Double getGross_sales() {
        return Gross_sales;
    }
    public void setGross_sales(Double gross_sales) {
        Gross_sales = gross_sales;
    }
    public List<AssistantDTO> getRun_Assistant_Name() {
        return Run_Assistant_Name;
    }
    public void setRun_Assistant_Name(List<AssistantDTO> run_Assistant_Name) {
        Run_Assistant_Name = run_Assistant_Name;
    }
    public Long getTotal_Stock() {
        return Total_Stock;
    }
    public void setTotal_Stock(Long total_Stock) {
        Total_Stock = total_Stock;
    }
    public Long getTotal_Sale() {
        return Total_Sale;
    }
    public void setTotal_Sale(Long total_Sale) {
        Total_Sale = total_Sale;
    }
    public List<String> getSupplier_Name() {
        return Supplier_Name;
    }
    public void setSupplier_Name(List<String> supplier_Name) {
        Supplier_Name = supplier_Name;
    }
    public List<OnGoingIDProductDTO> getSupplier() {
        return Supplier;
    }
    public void setSupplier(List<OnGoingIDProductDTO> supplier) {
        Supplier = supplier;
    }
    public String getJoin_code() {
        return Join_code;
    }
    public void setJoin_code(String join_code) {
        Join_code = join_code;
    }
    public AssistantPermissionCheckDTO getPermission() {
        return Permission;
    }
    public void setPermission(AssistantPermissionCheckDTO permission) {
        Permission = permission;
    }

}

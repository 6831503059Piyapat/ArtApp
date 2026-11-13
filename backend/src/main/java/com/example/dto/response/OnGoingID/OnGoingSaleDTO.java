package com.example.dto.response.OnGoingID;
public class OnGoingSaleDTO {

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
    String code_join;
    String Sale_run_Name;
    Double Gross_sales;
    Long Total_Stock;
    Long Total_Sale;
    public OnGoingSaleDTO(String sale_run_Id, String sale_run_Name, Double gross_sales, Long total_Stock, Long total_Sale,String code_join) {
        Sale_run_Id = sale_run_Id;
        Sale_run_Name = sale_run_Name;
        Gross_sales = gross_sales;
        Total_Stock = total_Stock;
        Total_Sale = total_Sale;
        this.code_join = code_join;
    }

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

    public String getCode_join() {
        return code_join;
    }
    public void setCode_join(String code_join) {
        this.code_join = code_join;
    }


}

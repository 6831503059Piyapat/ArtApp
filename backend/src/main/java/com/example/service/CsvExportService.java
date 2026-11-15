package com.example.service;

import org.springframework.stereotype.Service;
import com.example.dto.System.ProductCSVDTO;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class CsvExportService {

    public byte[] exportProducts(List<ProductCSVDTO> products) {

        StringBuilder csv = new StringBuilder();
    // public ProductCSVDTO(String product_name, Double product_unit_price, BigDecimal product_price, String rnu_assistant_name, String payment_method, Double total_price, LocalDateTime rnu_created_at) {

        // Header
        csv.append("'Number','Time','Product Name',Product_price,'Quantity','Total_Price','Payment_Method','Assistant_Name'\r\n");

        // Data
        for (ProductCSVDTO product : products) {
            csv.append(products.indexOf(product)+1).append(",");
            csv.append(product.getTimestamp()).append(",");
            csv.append(escapeCsv(product.getProduct_name())).append(",");
            csv.append(product.getProduct_unit_price()).append(",");
            csv.append(product.getQuantity()).append(",");
            csv.append(product.getTotal_price()).append(",");
            csv.append(escapeCsv(product.getPayment_method())).append(",");
            csv.append(escapeCsv(product.getRnu_assistant_name())).append("\r\n");
        }

        // UTF-8 BOM เพื่อให้ Excel อ่านภาษาไทยได้ถูกต้อง
        String BOM = "\uFEFF";

        return (BOM + csv).getBytes(StandardCharsets.UTF_8);
    }

    private String escapeCsv(String value) {
        if (value == null) {
            return "";
        }

        return "\"" + value.replace("\"", "\"\"") + "\"";
    }
}
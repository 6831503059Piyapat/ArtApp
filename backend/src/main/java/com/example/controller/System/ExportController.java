package com.example.controller.System;

import com.example.dto.System.ProductCSVDTO;
import com.example.repository.OnGoing.ProductRepo;
import com.example.service.CsvExportService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/backend/export")
public class ExportController {

    private final ProductRepo productRepository;
    private final CsvExportService csvExportService;

    public ExportController(
            ProductRepo productRepository,
            CsvExportService csvExportService
    ) {
        this.productRepository = productRepository;
        this.csvExportService = csvExportService;
    }

    @GetMapping("/products/{sale_run_id}")
    public ResponseEntity<byte[]> exportProducts(@PathVariable("sale_run_id") String sale_run_id) {

        List<ProductCSVDTO> products = productRepository.findProductTOCSVById(sale_run_id);

        byte[] csv = csvExportService.exportProducts(products);

        return ResponseEntity.ok()
                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"products.csv\""
                )
                .contentType(MediaType.parseMediaType(
                    "text/csv; charset=UTF-8"
                ))
                .contentLength(csv.length)
                .body(csv);
    }
}
package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.example.dto.request.SaleRunDTO;
import com.example.dto.request.SaleRunExpenseDTO;
import com.example.dto.request.SaleRunProductDTO;
import com.example.dto.request.SaleRunSupplierDTO;
import com.example.entity.SaleRunEntity;
import com.example.repository.SaleRunRepo;
import com.example.service.SaleRunService;

class SaleRunServiceTests {
    @Test
    void createsSaleRunWithNestedExpensesSuppliersAndProducts() {
        SaleRunRepo repository = mock(SaleRunRepo.class);
        when(repository.save(any(SaleRunEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        SaleRunDTO request = new SaleRunDTO(
                "November Market",
                "2026-11-04",
                "Bangkok",
                "DAWIF-OPFWOPFA959-89",
                List.of(new SaleRunExpenseDTO(1, "Rent", "Venue", 1500)),
                List.of(new SaleRunSupplierDTO(
                        "supplier-1",
                        "Artist",
                        "seller",
                        List.of(new SaleRunProductDTO(10, "Print", 5, 200, "supplier-1")))));

        SaleRunEntity result = new SaleRunService(repository).createSaleRun(request);

        assertEquals("November Market", result.getSale_run_name());
        assertTrue(result.isIs_Active());
        assertEquals(1, result.getExpensesLogs().size());
        assertEquals(1500, result.getExpensesLogs().get(0).getAmount());
        assertEquals(1, result.getSuppliers().size());
        assertEquals(1, result.getSuppliers().get(0).getProducts().size());
        assertEquals(5, result.getSuppliers().get(0).getProducts().get(0).getStart_stock());
    }
}

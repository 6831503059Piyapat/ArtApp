package com.example.service;

import java.util.List;
import java.util.Optional;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.example.dto.request.SaleRunDTO;
import com.example.entity.ExpenseLogEntity;
import com.example.entity.ProductEntity;
import com.example.entity.SaleRunEntity;
import com.example.entity.SupplierEntity;
import com.example.repository.SaleRunRepo;

@Service
public class SaleRunService {
    private final SaleRunRepo saleRunRepository;

    public SaleRunService(SaleRunRepo saleRunRepository) {
        this.saleRunRepository = saleRunRepository;
    }

    @Transactional
    public SaleRunEntity createSaleRun(SaleRunDTO saleRunDTO) {
        SaleRunEntity saleRun = new SaleRunEntity();
        saleRun.setSale_run_name(saleRunDTO.runName());
        saleRun.setDate_created(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(java.time.LocalDateTime.now()));
        saleRun.setDate_closed(saleRunDTO.runDate());
        saleRun.setSale_run_location(saleRunDTO.runLocation());
        saleRun.setIs_Active(true);

        Optional.ofNullable(saleRunDTO.Expense()).orElseGet(List::of).forEach(expenseDTO -> {
            ExpenseLogEntity expense = new ExpenseLogEntity();
            expense.setExpense_id(String.valueOf(expenseDTO.Id()));
            expense.setDescription(expenseDTO.Name());
            expense.setCategory(expenseDTO.Category());
            expense.setAmount(expenseDTO.Price().doubleValue());
            expense.setPaid_by_User_id(saleRunDTO.Host_id());
            expense.setTimestamp(saleRunDTO.runDate());
            saleRun.addExpense(expense);
        });

        Optional.ofNullable(saleRunDTO.Supplier()).orElseGet(List::of).forEach(supplierDTO -> {
            SupplierEntity supplier = new SupplierEntity();
            supplier.setSupplier_id(supplierDTO.Id());
            supplier.setSupplier_name(supplierDTO.Name());

            Optional.ofNullable(supplierDTO.Product()).orElseGet(List::of).forEach(productDTO -> {
                ProductEntity product = new ProductEntity();
                product.setProduct_id(String.valueOf(productDTO.Id()));
                product.setProduct_name(productDTO.Name());
                product.setPrice(productDTO.Price().doubleValue());
                product.setStart_stock(productDTO.Quantity().intValue());
                product.setCurrent_stock(productDTO.Quantity().intValue());
                product.setImage_url("");
                supplier.addProduct(product);
            });

            saleRun.addSupplier(supplier);
        });

        return saleRunRepository.save(saleRun);
    }
}

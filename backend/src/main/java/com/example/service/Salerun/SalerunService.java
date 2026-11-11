package com.example.service.Salerun;


import com.example.entity.SaleRunEntity;
import com.example.repository.Salerun.SalerunRepo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.example.dto.request.SaleRunDTO;
import com.example.dto.request.SaleRunExpenseDTO;

import java.time.LocalDate;

import java.util.Random;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.entity.SupplierEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;
import com.example.repository.SupplierRepo;
import com.example.entity.ProductEntity;
import com.example.repository.OnGoing.ProductRepo;
import com.example.repository.ExpenseRepo;
import com.example.entity.ExpenseLogEntity;
@Service
public class SalerunService {

    private final SalerunRepo salerunRepository;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final SupplierRepo supplierRepository;
    private final ProductRepo productRepository;
    private final ExpenseRepo expensesRepository;
    public SalerunService(SalerunRepo salerunRepository, SupplierRepo supplierRepository, ProductRepo productRepository, ExpenseRepo expensesRepository) {
        this.salerunRepository = salerunRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.expensesRepository = expensesRepository;
    }
    @PersistenceContext
    private EntityManager entityManager; 

    @Transactional 
    public void createSaleRun(SaleRunDTO saleRunDTO) {
        
        String runName = saleRunDTO.getRunName();
        String runDate = saleRunDTO.getRunDate();
        String runLocation = saleRunDTO.getRunLocation();
        String runOwnerName = saleRunDTO.getRunOwnerName();
        String runOwnerId = saleRunDTO.getRunOwnerId();
        
         Random random = new Random();
        StringBuilder sb = new StringBuilder(15);
       
        for (int i = 0; i < 15; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        
        String sale_run_id = sb.toString() + "-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        java.sql.Timestamp timestamp = java.sql.Timestamp.valueOf(LocalDateTime.now());
        String timestampStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        salerunRepository.createSaleRun(sale_run_id,null,runDate,runOwnerId,true,runLocation,runName);
        SaleRunEntity saleRun = entityManager.getReference(SaleRunEntity.class, sale_run_id);
        
        if (saleRunDTO.getSections() != null && !saleRunDTO.getSections().isEmpty()) {
        List<SupplierEntity> entitiesToSave = new ArrayList<>();
        List<ProductEntity> productEntitiesToSave = new ArrayList<>();
        
       
        for (int i = 0; i < saleRunDTO.getSections().size(); i++) {
        String generatedIdSupplier = "supplier"+ i+"-"+sale_run_id;
        String sectionName = saleRunDTO.getSections().get(i).getName();
        String generatedIdProduct = "product-"+i+"-"+timestampStr+"-"+sale_run_id;
        SupplierEntity entity = new SupplierEntity();
        entity.setSupplier_id(generatedIdSupplier);
        entity.setSupplier_name(sectionName);
        entity.setSaleRun(saleRun);

                for (int j = 0; j < saleRunDTO.getSections().get(i).getProducts().size(); j++) {
                    ProductEntity productEntity = new ProductEntity();
                    productEntity.setProduct_id(generatedIdProduct + "-" + j);
                    productEntity.setProduct_Name(saleRunDTO.getSections().get(i).getProducts().get(j).getName());
                    productEntity.setSupplier(entity);
                    productEntity.setProduct_UnitPrice(saleRunDTO.getSections().get(i).getProducts().get(j).getPrice().doubleValue());
                    productEntity.setImage_url(""); // Set the image URL if available
                    productEntity.setStart_Stock(saleRunDTO.getSections().get(i).getProducts().get(j).getQuantity());
                    productEntity.setCurrent_Stock(saleRunDTO.getSections().get(i).getProducts().get(j).getQuantity());
                    productEntitiesToSave.add(productEntity);
                }

        entitiesToSave.add(entity);
            
        }         
         supplierRepository.saveAllAndFlush(entitiesToSave);
         productRepository.saveAllAndFlush(productEntitiesToSave);

        } 
        if(saleRunDTO.getExpenses() != null && !saleRunDTO.getExpenses().isEmpty()) {     
    List<ExpenseLogEntity> expenses = new ArrayList<>();
            for (int i = 0; i < saleRunDTO.getExpenses().size(); i++) {
                String generatedIdExpense = "expense-"+i+"-"+sale_run_id;
                SaleRunExpenseDTO expenseDTO = saleRunDTO.getExpenses().get(i);
                ExpenseLogEntity expense = new ExpenseLogEntity();
                expense.setExpense_id(generatedIdExpense);
                expense.setAmount(expenseDTO.getAmount().doubleValue());
                expense.setCategory(expenseDTO.getCategory());
                expense.setDescription(expenseDTO.getName());
                expense.setPaid_by_User_Name(runOwnerName);
                expense.setTimestamp(LocalDateTime.now());
                expense.setSaleRun(saleRun);
                expenses.add(expense);

            }
            expensesRepository.saveAllAndFlush(expenses);
            
            
        }
        
    
    }

    @Transactional
    public void endSaleRun(String saleId) {
        salerunRepository.endSaleRun(saleId);
    }
}


    

   
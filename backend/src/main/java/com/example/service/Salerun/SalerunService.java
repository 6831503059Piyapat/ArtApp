package com.example.service.Salerun;


import com.example.entity.SaleRunEntity;
import com.example.repository.Salerun.SalerunRepo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.example.dto.request.SaleRunDTO;
import com.example.dto.request.SaleRunExpenseDTO;

import com.example.dto.System.SupplierFindDTO;
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
import com.example.repository.RunSupplierPayoutRepo;
import com.example.entity.ProductEntity;
import com.example.entity.RunSupplierPayoutEntity;
import com.example.repository.OnGoing.ProductRepo;
import com.example.entity.ChangesHistoryEntity;
import com.example.repository.ChangeHistoryRepo;
import com.example.repository.ExpenseRepo;
import com.example.repository.Assistant.AssistantRepo;
import com.example.entity.ExpenseLogEntity;
import jakarta.persistence.EntityNotFoundException;
@Service
public class SalerunService {

    private final SalerunRepo salerunRepository;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final SupplierRepo supplierRepository;
    private final ProductRepo productRepository;
    private final AssistantRepo assistantRepository;
    private final ExpenseRepo expensesRepository;
    private final RunSupplierPayoutRepo runSupplierPayoutRepository;
    private final ChangeHistoryRepo changeHistoryRepository;
    public SalerunService(SalerunRepo salerunRepository, SupplierRepo supplierRepository, ProductRepo productRepository, ExpenseRepo expensesRepository, ChangeHistoryRepo changeHistoryRepository, RunSupplierPayoutRepo runSupplierPayoutRepository, AssistantRepo assistantRepository) {
        this.salerunRepository = salerunRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.expensesRepository = expensesRepository;
        this.changeHistoryRepository = changeHistoryRepository;
        this.runSupplierPayoutRepository = runSupplierPayoutRepository;
        this.assistantRepository = assistantRepository;
    }
    @PersistenceContext
    private EntityManager entityManager; 

    @Transactional 
    public void createSaleRun(SaleRunDTO saleRunDTO) {
        
        String runName = saleRunDTO.getRunName();
        LocalDateTime runDate = saleRunDTO.getRunDate();
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
        StringBuilder sbc = new StringBuilder(7);
       
        for (int i = 0; i < 7; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sbc.append(CHARACTERS.charAt(randomIndex));
        }
        String code_join = sbc.toString();
        java.sql.Timestamp timestamp = java.sql.Timestamp.valueOf(LocalDateTime.now());
        String timestampStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        salerunRepository.createSaleRun(sale_run_id,null,runDate,runOwnerId,true,runLocation,code_join,runName  );
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
         StringBuilder sbca = new StringBuilder(7);
       
        for (int i = 0; i < 7; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sbca.append(CHARACTERS.charAt(randomIndex));
        }
        String runassistanIDGenrate = sbca.toString();
        
        assistantRepository.addRunAssistant(runassistanIDGenrate + "-" + runOwnerId, sale_run_id, runOwnerId, true, true, true, true, true);
    }

    @Transactional
    public void endSaleRun(String saleId,String assistantName) {
        salerunRepository.endSaleRun(saleId, LocalDateTime.now());
            // public RunSupplierPayoutEntity(String Payout_id,String Sale_run_id,String Supplier_id , double Gross_sale, int Total_item_sold, double Stall_deductions, double Net_payout, boolean Is_settled) {

        
        Random random = new Random();
        StringBuilder sb = new StringBuilder(15);
       
        for (int i = 0; i < 15; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        Double totalExpenses = expensesRepository.findTotalExpensesBySaleRunId(saleId);
        SaleRunEntity saleRun = salerunRepository.findById(saleId)
                .orElseThrow(() -> new EntityNotFoundException("Sale run not found with ID: " + saleId));

        List<RunSupplierPayoutEntity> runSupplierPayouts = new ArrayList<>();
        List<String> suplierIds = supplierRepository.findSupplierBySaleRunId(saleId);
        for(String supplierId : suplierIds){
           RunSupplierPayoutEntity runSupplierPayout = new RunSupplierPayoutEntity();
           SupplierFindDTO supplierFindDTO = supplierRepository.findBySaleRunIdAndProductName(supplierId);
           runSupplierPayout.setGross_sale(supplierFindDTO.getTotal_products().doubleValue());
           runSupplierPayout.setTotal_item_sold(supplierFindDTO.getQuantity().intValue());
           runSupplierPayout.setStall_deductions(totalExpenses / suplierIds.size());
           runSupplierPayout.setNet_payout(runSupplierPayout.getGross_sale() - runSupplierPayout.getStall_deductions());
           runSupplierPayout.setSale_run_id(saleId);
           runSupplierPayout.setSupplier_id(supplierId);
           runSupplierPayout.setSaleRun(saleRun);
           runSupplierPayout.setSupplier(
                   supplierRepository.findById(supplierId)
                           .orElseThrow(() -> new EntityNotFoundException(
                                   "Supplier not found with ID: " + supplierId)));
           runSupplierPayout.setIs_settled(false);
           StringBuilder sbp = new StringBuilder(15);
              for (int i = 0; i < 15; i++) {
                 int randomIndex = random.nextInt(CHARACTERS.length());
                 sbp.append(CHARACTERS.charAt(randomIndex));
                }
           runSupplierPayout.setPayout_id("Payout-" + sbp.toString() + supplierId.indexOf(supplierId) + "-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
            runSupplierPayouts.add(runSupplierPayout);
        }

        String generatedId = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        changeHistoryRepository.save(new ChangesHistoryEntity("CHL-ENDSALERUN" + generatedId + "-" + saleId, saleId, assistantName,assistantName,LocalDateTime.now(),"End Run", "End Sale Run: "));
        runSupplierPayoutRepository.saveAllAndFlush(runSupplierPayouts);

    }
}


    

   
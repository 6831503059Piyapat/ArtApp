package com.example.service.OnGoing;


import com.example.repository.OnGoing.OnGoingIDRepo;
import com.example.dto.response.OnGoingID.OnGoingIDProductDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductSell.CartDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductSell.SellItemDTO;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;
import com.example.dto.response.OnGoingID.ProductDTO;
import com.example.repository.Assistant.AssistantRepo;
import com.example.entity.ProductEntity;
import org.springframework.stereotype.Service;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductFixDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductAddDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductDeleteDTO;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example. entity.ExpenseLogEntity;
import com.example.dto.response.OnGoingID.SupplierOnGoingDTO;
import com.example.dto.response.OnGoingID.OnGoingSaleDTO;
import com.example.entity.SaleLogsEntity;
import java.util.List;
import java.util.Random;

import com.example.entity.ChangesHistoryEntity;
import com.example.repository.OnGoing.ProductRepo;
import java.util.ArrayList;

import com.example.repository.SaleLog.SaleLogRepo;
import com.example.repository.Salerun.SalerunRepo;
import com.example.repository.SupplierRepo;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import com.example.repository.ExpenseRepo;
import com.example.repository.ExpensesLogRepo;
import com.example.repository.ChangeHistoryRepo;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OnGoingIDService {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final OnGoingIDRepo onGoingIDRepository;
    private final SaleLogRepo saleLogRepository;
    private final ChangeHistoryRepo changesHistoryRepository;
    private final AssistantRepo assistantRepository;
    private final SalerunRepo saleRunRepository;
    private final ProductRepo productRepository;
    private final SupplierRepo supplierRepository;
    private final ExpensesLogRepo expenseLogRepository;

    public OnGoingIDService(OnGoingIDRepo onGoingIDRepository, SaleLogRepo saleLogRepository, ChangeHistoryRepo changesHistoryRepository, AssistantRepo assistantRepository, ProductRepo productRepository, SalerunRepo saleRunRepository, SupplierRepo supplierRepository, ExpensesLogRepo expenseLogRepository) {
        this.onGoingIDRepository = onGoingIDRepository;
        this.saleLogRepository = saleLogRepository;
        this.changesHistoryRepository = changesHistoryRepository;
        this.assistantRepository = assistantRepository;
        this.productRepository = productRepository;
        this.saleRunRepository = saleRunRepository;
        this.supplierRepository = supplierRepository;
        this.expenseLogRepository = expenseLogRepository;
    }

    @Transactional(readOnly = true)
    public OnGoingIDDTO getOnGoingListBySalesId(String Sale_run_Id) {
    if (Sale_run_Id == null || Sale_run_Id.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sale run ID is required");
    }

    List<OnGoingIDProductDTO> onGoingIDProductDTO;
       onGoingIDProductDTO = new ArrayList<>();
       List<SupplierOnGoingDTO> supplierDTO = onGoingIDRepository.findSupplierBySaleRunId(Sale_run_Id);
       for (SupplierOnGoingDTO supplier : supplierDTO) {
            String Supplier_id = supplier.getSupplier_Id();
            List<ProductDTO> products = onGoingIDRepository.findProductBySupplierId(Supplier_id);
            onGoingIDProductDTO.add(new OnGoingIDProductDTO(Supplier_id, supplier.getSupplier_Name(), null, null, products));

        }
        List<String> assistanceNames = assistantRepository.findListAssistantBySalesId(Sale_run_Id);
 
        OnGoingSaleDTO onGoingSaleDTO = onGoingIDRepository.findOnGoingIDListBySalesId(Sale_run_Id);
        if (onGoingSaleDTO == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Sale run not found: " + Sale_run_Id
            );
        }
        OnGoingIDDTO onGoingIDDTO = new OnGoingIDDTO();
        onGoingIDDTO.setSale_run_Id(onGoingSaleDTO.getSale_run_Id());
        onGoingIDDTO.setSale_run_Name(onGoingSaleDTO.getSale_run_Name());
        onGoingIDDTO.setGross_sales(onGoingSaleDTO.getGross_sales());
        onGoingIDDTO.setTotal_Stock(onGoingSaleDTO.getTotal_Stock());
        onGoingIDDTO.setTotal_Sale(onGoingSaleDTO.getTotal_Sale());
        List<String> supplierNames = new ArrayList<>();
        for (SupplierOnGoingDTO supplier : supplierDTO) {
            supplierNames.add(supplier.getSupplier_Name());
        }
        onGoingIDDTO.setSupplier_Name(supplierNames);
        onGoingIDDTO.setSupplier(onGoingIDProductDTO);
        onGoingIDDTO.setRun_Assistant_Name(assistanceNames);

        return onGoingIDDTO;
    }

    @Transactional 
    public void confirmSale(SellItemDTO sellItemDTO){
        String timestampStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String DateTimeStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String sale_run_Id = sellItemDTO.getSaleRunId();
        List<CartDTO> cart = sellItemDTO.getCart();
        List<SaleLogsEntity> saleLogs = new ArrayList<>();
        for (CartDTO item : cart) {
            //Insert Sale log
            SaleLogsEntity saleLog = new SaleLogsEntity();
            saleLog.setSale_logs_id("saleLog-" + sale_run_Id + "-" + cart.indexOf(item) + "-" + timestampStr);
            saleLog.setUnit_price(Double.valueOf(item.getPrice()));
            saleLog.setProduct_name(item.getName());
            saleLog.setQuantity(item.getQuantity());
            saleLog.setRun_Assistant_Name(sellItemDTO.getAssistanceName());
            saleLog.setSale_run_id(sale_run_Id);
            saleLog.setSupplier_Name(item.getSupplierName());
            saleLog.setTime_sold(LocalDateTime.parse(DateTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            saleLog.setTotal_Price(item.getPrice() * item.getQuantity());
            saleLogs.add(saleLog);
            saleLog.setSaleRun(
            saleRunRepository.getReferenceById(sale_run_Id)
);
            ///
            //Update Product Stock
            productRepository.updateProductCurrentStock(item.getProductId(),item.getQuantity());

        }
        saleLogRepository.saveAllAndFlush(saleLogs);


    }
    @Transactional
    public void saveChanges(String saleRunId, String assistanceName, List<ProductFixDTO> fixStock, List<ProductAddDTO> add, List<ProductDeleteDTO> delete) {
      
        List<ChangesHistoryEntity> changesLog = new ArrayList<>();
        
        if (fixStock != null){
            String timestampStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            for (ProductFixDTO product : fixStock) {
                
               ProductEntity productEntityFind = productRepository.findById(product.getProductId()).orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + product.getProductId()));
               ProductEntity productEntity = new ProductEntity();
               Integer startStockFind = productEntityFind.getStart_Stock();
               Integer currentStockFind = productEntityFind.getCurrent_Stock();
               Integer newStartStock = productEntity.getStart_Stock();
                //    public ChangesHistoryEntity(String History_id, String Sale_run_id, String Change_by_Username, String Run_Assistant_Name, LocalDateTime timestamp, String action, String details) {

             
                if (productEntityFind != null) {
                    if(currentStockFind < product.getStock()){
                        // increase start stock by the difference between current stock and new stock
                        newStartStock = startStockFind + (product.getStock() - currentStockFind);
                        changesLog.add(new ChangesHistoryEntity("CHL-Stock" + timestampStr + "-" + product.getProductId(), saleRunId, product.getAssistantName(),product.getAssistantName(),LocalDateTime.now(),"Restock", "Stock adjusted +  " + (product.getStock() - currentStockFind) + "units"));
                    }
                    else if(currentStockFind > product.getStock()){
                        // decrease start stock by the difference between current stock and new stock
                        changesLog.add(new ChangesHistoryEntity("CHL-" + timestampStr + "-" + product.getProductId(), saleRunId, product.getAssistantName(),product.getAssistantName(),LocalDateTime.now(),"Restock", "Stock adjusted -  " + (product.getStock() - currentStockFind) + "units"));

                        newStartStock = startStockFind - (currentStockFind - product.getStock());
                    }
                    else{
                        
                        newStartStock = startStockFind;
                    }
                     if(productEntityFind.getProduct_UnitPrice() != product.getPrice()){
                            changesLog.add(new ChangesHistoryEntity("CHL-Price" + timestampStr + "-" + product.getProductId(), saleRunId, product.getAssistantName(),product.getAssistantName(),LocalDateTime.now(),"Price Update", "Adjusted price from " + productEntityFind.getProduct_UnitPrice() + " to " + product.getPrice()));
                        }
                    productRepository.editProduct(product.getProductId(), product.getName(), product.getPrice(), product.getStock(), newStartStock);
                }
                
            }
        }
        if (add != null){

            List<ProductEntity> newProducts = new ArrayList<>();
            String timestampStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            for (ProductAddDTO product : add) {
                String generatedIdProduct = "product-"+add.indexOf(product)+"-"+timestampStr+"-"+saleRunId;
                ProductEntity productEntity = new ProductEntity();
                productEntity.setProduct_id(generatedIdProduct);
                productEntity.setStart_Stock(product.getStock());
                productEntity.setCurrent_Stock(product.getStock());
                productEntity.setImage_url("");
                productEntity.setProduct_UnitPrice(product.getProductprice());
                productEntity.setProduct_Name(product.getProductname());
                productEntity.setSupplier_id(product.getSupplierId());
                productEntity.setSupplier(
                        supplierRepository.findById(product.getSupplierId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                        "Supplier not found with ID: " + product.getSupplierId()
                                ))
                );


                newProducts.add(productEntity);
                changesLog.add(new ChangesHistoryEntity("CHL-ADD" + timestampStr + "-" + generatedIdProduct + add.indexOf(product), saleRunId, assistanceName,assistanceName,LocalDateTime.now(),"ADD", "ADD Product: " + product.getProductname()));

            }
            productRepository.saveAllAndFlush(newProducts);
        }
        if (delete != null){
            String timestampStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            for (ProductDeleteDTO product : delete) {
                productRepository.deleteProductById(product.getProductId());
                
                changesLog.add(new ChangesHistoryEntity("CHL-DELETE" + timestampStr + "-" + product.getProductId(), saleRunId, assistanceName,assistanceName,LocalDateTime.now(),"DELETE", "DELETE Product: " + product.getProductname()));

            }
        }
        changesHistoryRepository.saveAllAndFlush(changesLog);

    }
    public List<ExpenseLogEntity> getExpensesBySaleRunId(String saleRunId) {
        return expenseLogRepository.findBySaleRunId(saleRunId);
    }

    public void addExpenseLog(ExpenseLogEntity expenseLog,String sale_run_id) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(5);
       
        for (int i = 0; i < 5; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        
        String generatedId = sb.toString() + "-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        expenseLog.setExpense_id("expenseLog-" + generatedId + "-" + sale_run_id);
        expenseLog.setTimestamp(LocalDateTime.now());
        expenseLog.setSaleRun(
            saleRunRepository.getReferenceById(sale_run_id)
        );
        expenseLogRepository.save(expenseLog);
        changesHistoryRepository.save(new ChangesHistoryEntity("CHL-EXPENSE" + generatedId + "-" + sale_run_id, sale_run_id, expenseLog.getPaid_by_User_Name(),expenseLog.getPaid_by_User_Name(),LocalDateTime.now(),"Expense Add", "ADD Expense: " + expenseLog.getDescription()));

    }
}


    

   
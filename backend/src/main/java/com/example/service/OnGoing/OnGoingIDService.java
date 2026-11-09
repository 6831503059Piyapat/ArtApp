package com.example.service.OnGoing;


import com.example.repository.OnGoing.OnGoingIDRepo;
import com.example.dto.response.OnGoingID.OnGoingIDProductDTO;
import com.example.dto.request.OnGoing.OngoingID.SellItemDTO;
import com.example.dto.request.OnGoing.OngoingID.CartDTO;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;
import com.example.dto.response.OnGoingID.ProductDTO;
import com.example.repository.Assistant.AssistantRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.dto.response.OnGoingID.SupplierOnGoingDTO;
import com.example.dto.response.OnGoingID.OnGoingSaleDTO;
import com.example.entity.SaleLogsEntity;
import java.util.List;
import com.example.repository.OnGoing.ProductRepo;
import java.util.ArrayList;
import com.example.repository.SaleLog.SaleLogRepo;
import com.example.repository.Salerun.SalerunRepo;

@Service
public class OnGoingIDService {

    private final OnGoingIDRepo onGoingIDRepository;
    private final SaleLogRepo saleLogRepository;
    private final AssistantRepo assistantRepository;
    private final SalerunRepo saleRunRepository;
    private final ProductRepo productRepository;

    public OnGoingIDService(OnGoingIDRepo onGoingIDRepository, SaleLogRepo saleLogRepository, AssistantRepo assistantRepository, ProductRepo productRepository, SalerunRepo saleRunRepository) {
        this.onGoingIDRepository = onGoingIDRepository;
        this.saleLogRepository = saleLogRepository;
        this.assistantRepository = assistantRepository;
        this.productRepository = productRepository;
        this.saleRunRepository = saleRunRepository;
    }

    @Transactional(readOnly = true)
    public OnGoingIDDTO getOnGoingListBySalesId(String Sale_run_Id) {
  
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
}


    

   
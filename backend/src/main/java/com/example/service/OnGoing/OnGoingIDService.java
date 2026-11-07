package com.example.service.OnGoing;


import com.example.repository.OnGoing.OnGoingIDRepo;
import com.example.dto.response.OnGoingID.OnGoingIDProductDTO;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;
import com.example.dto.response.OnGoingID.ProductDTO;
import com.example.repository.Assistant.AssistantRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class OnGoingIDService {

    private final OnGoingIDRepo onGoingIDRepository;
    private final AssistantRepo assistantRepository;

    public OnGoingIDService(OnGoingIDRepo onGoingIDRepository, AssistantRepo assistantRepository) {
        this.onGoingIDRepository = onGoingIDRepository;
        this.assistantRepository = assistantRepository;
    }

    @Transactional(readOnly = true)
    public OnGoingIDDTO getOnGoingListBySalesId(String Sale_run_Id) {
    //     String Supplier_Id;
    // String Supplier_Name;
    // String Category;
    //String Host_user_Id;
       List<OnGoingIDProductDTO> onGoingIDProductDTO = onGoingIDRepository.findSupplierBySaleRunId(Sale_run_Id);
       for (OnGoingIDProductDTO supplier : onGoingIDProductDTO) {
            String Supplier_id = supplier.getSupplier_Id();
            List<ProductDTO> products = onGoingIDRepository.findProductBySupplierId(Supplier_id);
            supplier.setProducts(products);
            if(products.get(0).getSupplier_Id().equals(Supplier_id) ){
                supplier.setCategory("Host");
            }
            else{
                supplier.setCategory("Supplier");
            }
        }
        List<String> assistanceNames = assistantRepository.findListAssistantBySalesId(Sale_run_Id);
    //           String Sale_run_Id;
    // String Sale_run_Name;
    // Double Gross_sales;
    // List<String> Run_Assistant_Name;
    // Integer Total_Stock;
    // Integer Total_Sale;
    // List<String> Supplier_Name;
    // List<OnGoingIDProductDTO> Supplier;

        OnGoingIDDTO onGoingIDDTO = onGoingIDRepository.findOnGoingIDListBySalesId(Sale_run_Id)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("On-going ID list not found for Sale_run_Id: " + Sale_run_Id));
        onGoingIDDTO.setSupplier(onGoingIDProductDTO);
        onGoingIDDTO.setRun_Assistant_Name(assistanceNames);

        return onGoingIDDTO;
    }
}


    

   
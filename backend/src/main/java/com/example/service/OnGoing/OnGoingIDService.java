package com.example.service.OnGoing;


import com.example.repository.OnGoingListRepo;
import com.example.repository.OnGoing.OnGoingIDRepo;
import com.example.dto.response.OnGoingDTO;
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
    public OnGoingIDDTO getOnGoingListByUserId(String Sale_run_Id) {
       List<OnGoingIDProductDTO> onGoingIDProductDTO = onGoingIDRepository.findSupplierBySaleRunId(Sale_run_Id);
       for (OnGoingIDProductDTO supplier : onGoingIDProductDTO) {
            String Supplier_id = supplier.getSupplier_Id();
            List<ProductDTO> products = onGoingIDRepository.findProductBySupplierId(Supplier_id);
            supplier.setProducts(products);
        }
        List<String> assistanceNames = assistantRepository.findListAssistantBySalesId(Sale_run_Id);
    //        String Supplier_Id;
    // String Supplier_Name;
    // String Category;
    // List<ProductDTO> products;

        OnGoingIDDTO onGoingIDDTO = new OnGoingIDDTO();
        onGoingIDDTO.setSupplier(onGoingIDProductDTO);
        onGoingIDDTO.setRun_Assistant_Name(assistanceNames);

        return onGoingIDDTO;
    }
}


    

   

package com.example.controller.OnGoing;
// import com.google.firebase.auth.FirebaseToken;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import io.github.cdimascio.dotenv.Dotenv;

import com.example.dto.request.Product.SellProductDTO;
import java.time.LocalDateTime;

import com.example.service.LiveStatusService;
import com.example.service.OnGoing.ProductManageService;
import com.example.dto.request.Product.editProductDTO;
import com.example.dto.request.Product.editListProductDTO;
import com.example.dto.request.Product.addProductDTO;
// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend/ongoing/Product")
public class ProductController {
   private final ProductManageService productManageService;
    private final LiveStatusService liveStatusService;
    Dotenv dotenv =Dotenv.configure().ignoreIfMissing().load();
    private SimpMessagingTemplate messagingTemplate;
    public ProductController(ProductManageService productManageService, LiveStatusService liveStatusService) {
        this.productManageService = productManageService;
    
        this.liveStatusService = liveStatusService;
    }
   

 @PutMapping("/sell")
    public ResponseEntity<String> SellProduct(@RequestBody SellProductDTO sellProductDTO) throws Exception {
        productManageService.updateProductQuantity(sellProductDTO.getProductId(), sellProductDTO.getAmountSold());
        productManageService.addProductLog( null, sellProductDTO.getSupplierName(),sellProductDTO.getProductName() , sellProductDTO.getAssistantName(), sellProductDTO.getSale_run_Id(), sellProductDTO.getPrice(), sellProductDTO.getAmountSold(), sellProductDTO.getPrice() * sellProductDTO.getAmountSold(),LocalDateTime.now().toString()) ;
        messagingTemplate.convertAndSend(dotenv.get("HEADER_ORIGIN_ALLOWED") + "/live-status/"+sellProductDTO.getSale_run_Id(), "Product sold: " + liveStatusService.updateLiveStatus(sellProductDTO.getSale_run_Id()));
        return ResponseEntity.ok("Product sold successfully");
    }

  @PutMapping("edit")
  public ResponseEntity<String> editProduct(@RequestBody editProductDTO editProductDTO) throws Exception {
        if(editProductDTO.getEditListProductDTOList() != null){
            for(editListProductDTO item : editProductDTO.getEditListProductDTOList()){

            
                if(item.getProductId() != null && item.getProductPrice() != null){
                    productManageService.updateProductPrice(item.getProductId(), item.getProductPrice());
                }
                if(item.getProductId() != null && item.getProductQuantity() != null){
                    productManageService.updateProductCurrentStock(item.getProductId(), item.getProductQuantity());
                }
                if(item.getProductId() != null && item.getProductName() != null){
                    productManageService.updateProductName(item.getProductId(), item.getProductName());
                }

            }
        }
        if(editProductDTO.getAddProductDTOList() != null){
            for(addProductDTO item : editProductDTO.getAddProductDTOList()){
                if(item.getProductName() != null && item.getProductQuantity() != null && item.getProductPrice() != null){
                    productManageService.addProduct(null,item.getSupplierId(),item.getProductName(), item.getProductPrice(),null, item.getProductQuantity(), item.getProductQuantity());
                }
            }
        }
        messagingTemplate.convertAndSend(dotenv.get("HEADER_ORIGIN_ALLOWED") + "/live-status/"+editProductDTO.getSale_run_Id(), "Product edited: " + liveStatusService.updateLiveStatus(editProductDTO.getSale_run_Id()));
       return ResponseEntity.ok("Product edited successfully");
    }

    
}

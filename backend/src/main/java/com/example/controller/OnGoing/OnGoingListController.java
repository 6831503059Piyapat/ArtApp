
package com.example.controller.OnGoing;
import com.example.dto.request.OnGoing.OngoingID.ProductSell.SellItemDTO;
// import com.google.firebase.auth.FirebaseToken;
import com.example.dto.response.OnGoingDTO;
import com.example.service.OnGoingListService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductRequestSaveDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductFixDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductAddDTO;
import com.example.dto.request.OnGoing.OngoingID.ProductEdit.ProductDeleteDTO;
import com.example.service.OnGoing.OnGoingIDService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.entity.ExpenseLogEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import com.example.dto.LiveStatsDTO;
import com.example.service.LiveStatusService;
import com.example.service.Assistant.AssistantService;
import com.example.dto.request.OnGoing.OngoingID.Permission.AssistantDTO;
import com.example.dto.request.OnGoing.OngoingID.Supplier.AddSupplierDTO;
import com.example.dto.response.OnGoingID.OnGoingIDDTO;
import java.util.Map;
// import java.util.Map;
// import java.util.HashMap;
@RestController
@RequestMapping("/backend")
public class OnGoingListController {
    private final OnGoingListService onGoingListService;
    private final OnGoingIDService onGoingIDService;
    private final LiveStatusService liveStatusService;
        private final SimpMessagingTemplate messagingTemplate;
    private final AssistantService assistantService;


    public OnGoingListController(OnGoingListService onGoingListService, OnGoingIDService onGoingIDService, SimpMessagingTemplate messagingTemplate, LiveStatusService liveStatusService, AssistantService assistantService) {
        this.onGoingListService = onGoingListService;
        this.onGoingIDService = onGoingIDService;
        this.liveStatusService = liveStatusService;
        this.messagingTemplate = messagingTemplate;
        this.assistantService = assistantService;
    }
@GetMapping("/ongoing-list")
public ResponseEntity<List<OnGoingDTO>> getOnGoingList(Authentication authentication) {
    String uid = authentication.getName();
    return ResponseEntity.ok(onGoingListService.getOnGoingListByUserId(uid));
}

    @GetMapping("/ongoing-list/{id}")
    public ResponseEntity<OnGoingIDDTO> fetchOnGoingListById(@PathVariable("id") String id) throws Exception {
                      
        return ResponseEntity.ok(onGoingIDService.getOnGoingListBySalesId(id));
    }

    @PostMapping("/confirm-sale")
    public ResponseEntity<String> confirmSale(@RequestBody SellItemDTO sellItemDTO) {
        // Call the service method to handle the sale confirmation logic
         
        onGoingIDService.confirmSale(sellItemDTO);
        LiveStatsDTO payload =  liveStatusService.updateLiveStatus(sellItemDTO.getSaleRunId());
        payload.setLiveID(sellItemDTO.getSaleRunId());
        
        messagingTemplate.convertAndSend(
            "/viewLive/" + sellItemDTO.getSaleRunId(),
            payload
        );
        return ResponseEntity.ok("Sale confirmed successfully");
    }
   
    @PutMapping("/ongoing/save-changes")
    public ResponseEntity<String> saveChanges(@RequestBody ProductRequestSaveDTO productRequestSaveDTO) {
        String saleRunId = productRequestSaveDTO.getSaleRunId();
        String assistanceName = productRequestSaveDTO.getAssistanceName();
        if (saleRunId == null || assistanceName == null) {
            return ResponseEntity.badRequest().body("SaleRunId and AssistanceName are required");
        }
        List<ProductFixDTO> fixStock = productRequestSaveDTO.getFixStock();
        List<ProductAddDTO> add = productRequestSaveDTO.getAdd();
        List<ProductDeleteDTO> delete = productRequestSaveDTO.getDelete();
        onGoingIDService.saveChanges(saleRunId, assistanceName, fixStock, add, delete);
        LiveStatsDTO payload =  liveStatusService.updateLiveStatus(saleRunId);
        payload.setLiveID(saleRunId);
        
        messagingTemplate.convertAndSend(
            "/viewLive/" + saleRunId,
            payload
        );
        return ResponseEntity.ok("Changes saved successfully");
    }
   @GetMapping("/ongoing/{id}/expenses-list")
    public ResponseEntity<List<ExpenseLogEntity>> fetchExpensesById(@PathVariable("id") String sale_id) throws Exception {
        // Implement the logic to fetch expenses by sale run ID here
        List<ExpenseLogEntity> expenses = onGoingIDService.getExpensesBySaleRunId(sale_id);
        return ResponseEntity.ok(expenses);
    }
    @PostMapping ("/ongoing/{id}/add-expense")
    public ResponseEntity<String> addExpense(@PathVariable("id") String sale_run_id, @RequestBody ExpenseLogEntity expenseLog) {
        // Implement the logic to add a new expense here
        onGoingIDService.addExpenseLog(expenseLog,sale_run_id);
        return ResponseEntity.ok("Expense added successfully");
    }
    @PostMapping ("/ongoing/{id}/add-supplier")
    public ResponseEntity<String> addSupplier(@PathVariable("id") String sale_run_id, @RequestBody  AddSupplierDTO supplier) {
        onGoingIDService.addSupplier(supplier, sale_run_id);
        LiveStatsDTO payload =  liveStatusService.updateLiveStatus(sale_run_id);
        payload.setLiveID(sale_run_id);
        
        messagingTemplate.convertAndSend(
            "/viewLive/" + sale_run_id,
            payload
        );
        return ResponseEntity.ok("Supplier added successfully");
    }
    @PutMapping ("/ongoing/update-assistant-permission")
    public ResponseEntity<String> updatePermission( @RequestBody AssistantDTO assistant) {
      assistantService.setPermissionAssistantBy_Id(assistant);
        return ResponseEntity.ok("Assistant permission updated successfully");
    }
}

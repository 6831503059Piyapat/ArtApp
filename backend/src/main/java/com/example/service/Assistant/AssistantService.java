package com.example.service.Assistant;

import com.example.repository.Assistant.AssistantRepo;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.dto.request.Assistant.AssistantReqDTO;
import com.example.dto.request.OnGoing.OngoingID.Permission.AssistantDTO;
@Service
public class AssistantService {

   private final AssistantRepo assistantRepository;

   public AssistantService(AssistantRepo assistantRepository) {
        this.assistantRepository = assistantRepository;
    }
    @Transactional(readOnly = true)
    public void setPermissionAssistantById(AssistantReqDTO assistantReqDTO) {
        
        String assistantId = assistantReqDTO.getAssistantId();
        Boolean can_manage_stock = assistantReqDTO.getCan_manage_stock();
        Boolean can_manage_permission = assistantReqDTO.getCan_manage_permission();
        Boolean can_record_expenses = assistantReqDTO.getCan_record_expenses();
        Boolean can_sell = assistantReqDTO.getCan_sell();
        Boolean can_view_log = assistantReqDTO.getCan_view_log();

        // @Param ("can_manage_stock") Boolean can_manage_stock,
        //                     @Param ("can_manage_permission") Boolean can_manage_permission,
        //                     @Param ("can_record_expenses") Boolean can_record_expenses,
        //                     @Param ("can_sell") Boolean can_sell,
        //                     @Param ("can_view_log") Boolean can_view_log);
        assistantRepository.updateRunAssistant(assistantId, can_manage_stock, can_manage_permission, can_record_expenses, can_sell, can_view_log);
    }
    @Transactional
    public void setPermissionAssistantBy_Id(AssistantDTO assistantDTO) {
        
        String assistantId = assistantDTO.getRun_assistace_id();
        Boolean can_manage_stock = assistantDTO.getCan_manage_stock();
        Boolean can_manage_permission = assistantDTO.getCan_manage_permission();
        Boolean can_record_expenses = assistantDTO.getCan_record_expenses();
        Boolean can_sell = assistantDTO.getCan_sell();
        Boolean can_view_log = assistantDTO.getCan_view_log();

        // @Param ("can_manage_stock") Boolean can_manage_stock,
        //                     @Param ("can_manage_permission") Boolean can_manage_permission,
        //                     @Param ("can_record_expenses") Boolean can_record_expenses,
        //                     @Param ("can_sell") Boolean can_sell,
        //                     @Param ("can_view_log") Boolean can_view_log);
        assistantRepository.updateRunAssistant(assistantId, can_manage_stock, can_manage_permission, can_record_expenses, can_sell, can_view_log);
    }
    public Long checkAssistant(@Param("user_id") String user_id, @Param("sale_run_id") String sale_run_id) {
        return assistantRepository.checkAssistant(user_id, sale_run_id);
    }
    public String findSalerunIdBycode(String code) {
        return assistantRepository.findSaleRunIdByCodeJoin(code);
    }
}
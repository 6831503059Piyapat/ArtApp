package com.example.service;


import com.example.dto.response.Complete.CompleteDTO;
import com.example.repository.CompleteListRepo;
import com.example.dto.response.Complete.CompleteListSumDTO;
import com.example.dto.response.Complete.CompleteListDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service
public class CompleteListService {

    private final CompleteListRepo completeListRepository;

    public CompleteListService(CompleteListRepo completeListRepository) {
        this.completeListRepository = completeListRepository;
    }

    @Transactional(readOnly = true)
    public CompleteDTO getCompleteListByUserId(String userId) {
        CompleteDTO completeTotalAndList = new CompleteDTO();
        CompleteListSumDTO completeListSum = completeListRepository.findCompleteListTotalSumByUserId(userId);
        List<CompleteListDTO> completeList = completeListRepository.findCompleteListByUserId(userId);
        completeTotalAndList.setAVG_Revenue(completeListSum.getAVG_Revenue());
        completeTotalAndList.setAVG_duration(completeListSum.getAVG_duration());
        completeTotalAndList.setTotal_Revenue(completeListSum.getTotal_Revenue());
        completeTotalAndList.setTotal_duration(completeListSum.getTotal_duration());
        completeTotalAndList.setTotal_item_sold(completeListSum.getTotal_item_sold());
        completeTotalAndList.setTotal_run_complete(completeListSum.getTotal_run_complete());
        
        completeTotalAndList.setCompleteList(completeList);
        return completeTotalAndList;
    }
}


    

   
package com.example.service;
import com.example.dto.response.OnGoingDTO;
import com.example.repository.OnGoing.OnGoingListRepo;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class OnGoingListService {

    private final OnGoingListRepo onGoingListRepository;

    public OnGoingListService(OnGoingListRepo onGoingListRepository) {
        this.onGoingListRepository = onGoingListRepository;
    }

    @Transactional(readOnly = true)
    public List<OnGoingDTO> getOnGoingListByUserId(String uid) {
    List<OnGoingDTO> result = onGoingListRepository.findOnGoingListByUserId(uid);
    return result;
}
}


    

   
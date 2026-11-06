package com.example.repository;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleLogsEntity;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import com.example.dto.LiveStatsDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface LiveStatusRepo extends JpaRepository<SaleLogsEntity, String> {

    @Query(value = """
       Query here
    """,nativeQuery = true)
    LiveStatsDTO findLiveStatusBySalesId(@Param("Saleid") String Saleid);

   
}

package com.example.repository;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleLogsEntity;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import com.example.dto.LiveStatsDTO;
import com.example.dto.SupplierLiveDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import com.example.dto.response.SaleLogs.SaleLogsDTO;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LiveStatusRepo extends JpaRepository<SaleLogsEntity, String> {


    // @Query(value = """
    //    Query here
    // """,nativeQuery = true)
    // LiveStatsDTO findLiveStatusBySalesId(@Param("Saleid") String Saleid);
    @Query (value = """
       Query here
    """,nativeQuery = true)
    List<SaleLogsDTO> findSaleLogsBySaleRun_SaleId(String Saleid);
    @Query (value = """
       Query here
    """,nativeQuery = true)
    List<SupplierLiveDTO> findSupplierBySaleRun_SaleId(String Saleid);

   
}

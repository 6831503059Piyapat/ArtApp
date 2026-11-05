package com.example.repository;


import com.example.dto.response.Complete.CompleteDTO;
import com.example.entity.SaleRunEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface CompleteListRepo extends JpaRepository<SaleRunEntity, String> {
// {
// total _run_complete:number;
// Total_duration:number;
// AVG_duration:number;
// Total_item_sold:number;
// Total_Revenue:number;
// AVG_Revenue:number;
// List_Complete:{
// Id_sales:string;
// Date_complete:string;
// Total_sold:number;
// Gross:number;
// Net_intake:number;
// }[];
// }
// ต้องเช็คว่า status = false ด้วย เพราะว่า complete list คือ list ที่ปิดแล้วเท่านั้น
    @Query(value = """
       Query here
    """,nativeQuery = true)
    List<CompleteDTO> findCompleteListByUserId(@Param("uid") String uid);

    

   
}

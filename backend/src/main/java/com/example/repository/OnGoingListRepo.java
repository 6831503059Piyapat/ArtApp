package com.example.repository;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface OnGoingListRepo extends JpaRepository<SaleRunEntity, String> {
// String id,
//     Boolean isOwner,
//     String title,
//     Boolean status, 
//     String booth_time_create,
//     String boothtimeEnd,
//     Double grossSales,
//     Double netSales,
//     Integer itemsCleared,
//     Integer itemsClearedMax,
//     Double soldPercentage,
//     Integer boothStaffMax,
//     Integer boothStaffList
// ต้องใช้ OR ด้วย กับ assistant_id = :uid เพราะว่า user ที่เป็น assistant ก็สามารถเข้าถึงได้เหมือนกัน
    @Query(value = """
       Query here
    """,nativeQuery = true)
    List<OnGoingDTO> findOnGoingListByUserId(@Param("uid") String uid);

   
}

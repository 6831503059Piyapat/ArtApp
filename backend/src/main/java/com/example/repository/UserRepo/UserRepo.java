package com.example.repository.UserRepo;


import com.example.dto.response.Complete.CompleteIDDTO;
import com.example.entity.SaleRunEntity;
import com.example.dto.response.SaleLogs.SaleLogsDTO;
import com.example.dto.response.ExpenseLogDTO;
import com.example.dto.response.ChangeMade.ChangeMadeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.entity.UserEntity;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.SupplierDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, String> {
   //Update display name
   @Query(value = "UPDATE user SET display_name = :displayName WHERE uid = :uid", nativeQuery = true)
   void updateDisplayName(@Param("uid") String uid, @Param("displayName") String displayName);
   

   
}

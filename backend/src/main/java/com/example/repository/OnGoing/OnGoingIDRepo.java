package com.example.repository.OnGoing;

import com.example.dto.response.DashboardDTO;
import com.example.dto.response.List_RunDTO;
import com.example.entity.SaleRunEntity;
import com.example.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.dto.response.OnGoingDTO;
import com.example.dto.response.OnGoingID.OnGoingIDProductDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.dto.response.OnGoingID.ProductDTO;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface OnGoingIDRepo extends JpaRepository<SaleRunEntity, String> {

    @Query(value = """
       Query here
    """,nativeQuery = true)
    List<ProductDTO> findProductBySupplierId(@Param("Supplier_Id") String Supplier_Id);
    
    @Query (value = """
       Query here
    """,nativeQuery = true)
    List<OnGoingIDProductDTO> findSupplierBySaleRunId(@Param("Sale_run_Id") String Sale_run_Id);

    
}

package com.example.dto.response;

import org.springframework.beans.factory.annotation.Value;

public interface OnGoingDTO {
    String getId();
    
    // ดึงค่า 1/0 มาแปลงเป็น boolean ผ่าน SpEL ป้องกัน Projection พัง
    @Value("#{target.isOwner == 1}")
    Boolean getIsOwner();
    
    String getTitle();
    
    @Value("#{target.status == 1}")
    Boolean getStatus();
    
    String getBooth_time_create();
    String getBoothtimeEnd();
    Double getGrossSales();
    Double getNetSales();
    Long getItemsCleared();
    Long getItemsClearedMax();
    Double getSoldPercentage();
    Integer getBoothStaffMax();
    Long getBoothStaffList();
}
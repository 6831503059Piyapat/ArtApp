package com.example.demo.repository;

import com.example.demo.entity.ExampleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExampleRepo extends JpaRepository<ExampleEntity, Long> {
    // สามารถเพิ่ม custom query method ได้ตามต้องการ
    ExampleEntity findByEmail(String email);
}
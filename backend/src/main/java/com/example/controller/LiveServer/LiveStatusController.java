package com.example.controller.LiveServer;

import com.example.dto.LiveStatsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/live-status")
@CrossOrigin(origins = "http://localhost:3000") // อนุญาตให้ Next.js ยิง REST API เข้ามาได้
public class LiveStatusController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/{Sale_run_Id}/update")
    public ResponseEntity<LiveStatsDTO> updateSensorData(
            @PathVariable String Sale_run_Id,
            @RequestBody LiveStatsDTO sensorData) {

        // 1. อัปเดต deviceId และเวลาล่าสุดลงใน Object
        sensorData.setLiveID(Sale_run_Id);

        // 2. กำหนด Topic ปลายทางตาม parameter (เช่น /topic/sensors/DEV-001)
        String destination = "/viewLive/" + Sale_run_Id;

        // 3. ส่ง Object ทั้งก้อนออกไปยัง WebSocket (แปลงเป็น JSON ให้อัตโนมัติ)
        messagingTemplate.convertAndSend(destination, "5555");

        return ResponseEntity.ok(sensorData);
    }
    @GetMapping("/viewLive/{saleRunId}")
    public ResponseEntity<String> getOrder(@PathVariable String saleRunId) {
        // ถ้ายังไม่มีในระบบ ให้สร้างออเดอร์จำลองสถานะ PENDING ขึ้นมา
        
        return ResponseEntity.ok("Order for saleRunId " + saleRunId + " is PENDING" + 1);
    }
}
package com.example.controller.LiveServer;

import com.example.dto.LiveStatsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import com.example.service.LiveStatusService;
import org.springframework.web.bind.annotation.*;
import com.example.dto.LiveStatsDTO;
import com.example.repository.LiveStatusRepo;

@RestController
@RequestMapping("/live-status")
@CrossOrigin(origins = "http://localhost:3000") // อนุญาตให้ Next.js ยิง REST API เข้ามาได้
public class LiveStatusController {
    @Autowired
    private LiveStatusService liveStatusService;
    private final LiveStatusRepo liveStatusRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public LiveStatusController(LiveStatusRepo liveStatusRepo) {
        this.liveStatusRepo = liveStatusRepo;
    }

    @PostMapping("/{Sale_run_Id}/update")
    public ResponseEntity<LiveStatsDTO> updateSensorData(
            @PathVariable String Sale_run_Id,
            @RequestBody LiveStatsDTO sensorData) {

        // 1. อัปเดต deviceId และเวลาล่าสุดลงใน Object
        sensorData.setLiveID(Sale_run_Id);
        LiveStatsDTO liveStats = liveStatusService.updateLiveStatus(Sale_run_Id);
        // 2. กำหนด Topic ปลายทางตาม parameter (เช่น /topic/sensors/DEV-001)
        String destination = "/viewLive/" + Sale_run_Id;

        // 3. ส่ง Object ทั้งก้อนออกไปยัง WebSocket (แปลงเป็น JSON ให้อัตโนมัติ)
        messagingTemplate.convertAndSend(destination,liveStats );

        return ResponseEntity.ok(sensorData);
    }
    @GetMapping("/viewLive/{saleRunId}")
    public ResponseEntity<LiveStatsDTO> getOrder(@PathVariable("saleRunId") String saleRunId) {
       if(liveStatusRepo.isSaleRunActive(saleRunId) == 0 || liveStatusRepo.isSaleRunActive(saleRunId) == null){
        return ResponseEntity.notFound().build();
       }
       LiveStatsDTO liveStats = liveStatusService.updateLiveStatus(saleRunId);

       liveStats.setLiveID(saleRunId);
        
        return ResponseEntity.ok(liveStats);
    }
}
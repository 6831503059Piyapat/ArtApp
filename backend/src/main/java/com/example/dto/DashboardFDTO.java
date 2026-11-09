package com.example.dto;

import com.example.dto.response.List_RunDTO;
import java.util.List;

public record DashboardFDTO (
    List<List_RunDTO> List_run
) {
}

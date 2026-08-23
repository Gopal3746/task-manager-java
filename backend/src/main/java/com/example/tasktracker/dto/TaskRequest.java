package com.example.tasktracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TaskRequest(
        @NotBlank @Size(max = 120) String title,
        @Size(max = 500) String description,
        boolean completed
) {}

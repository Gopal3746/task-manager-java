package com.example.tasktracker.controller;

import com.example.tasktracker.dto.TaskRequest;
import com.example.tasktracker.dto.TaskResponse;
import com.example.tasktracker.model.AppUser;
import com.example.tasktracker.model.Task;
import com.example.tasktracker.repository.TaskRepository;
import com.example.tasktracker.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository tasks;
    private final UserRepository users;

    public TaskController(TaskRepository tasks, UserRepository users) {
        this.tasks = tasks;
        this.users = users;
    }

    @GetMapping
    public List<TaskResponse> list(Authentication authentication) {
        return tasks.findByOwnerUsernameOrderByIdDesc(authentication.getName())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse create(@Valid @RequestBody TaskRequest request, Authentication authentication) {
        AppUser owner = users.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        Task task = new Task(
                request.title().trim(),
                cleanDescription(request.description()),
                request.completed(),
                owner
        );
        return toResponse(tasks.save(task));
    }

    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable Long id,
                               @Valid @RequestBody TaskRequest request,
                               Authentication authentication) {
        Task task = ownedTask(id, authentication.getName());
        task.update(
                request.title().trim(),
                cleanDescription(request.description()),
                request.completed()
        );
        return toResponse(tasks.save(task));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, Authentication authentication) {
        tasks.delete(ownedTask(id, authentication.getName()));
    }

    private Task ownedTask(Long id, String username) {
        return tasks.findByIdAndOwnerUsername(id, username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    private String cleanDescription(String description) {
        return description == null ? "" : description.trim();
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(task.getId(), task.getTitle(), task.getDescription(), task.isCompleted());
    }
}

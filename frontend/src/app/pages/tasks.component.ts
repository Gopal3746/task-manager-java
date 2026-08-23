import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPayload, TaskService } from '../core/task.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card">
      <h2>{{ editingId === null ? 'Add task' : 'Edit task' }}</h2>
      <form (ngSubmit)="save()">
        <label>Title</label>
        <input name="title" [(ngModel)]="form.title" maxlength="120" required />

        <label>Description</label>
        <textarea name="description" [(ngModel)]="form.description" maxlength="500"></textarea>

        <label class="row">
          <input style="width:auto;margin:0" name="completed" type="checkbox" [(ngModel)]="form.completed" />
          Completed
        </label>
        <br />

        <div class="row">
          <button type="submit">{{ editingId === null ? 'Add' : 'Save' }}</button>
          @if (editingId !== null) {
            <button type="button" class="secondary" (click)="resetForm()">Cancel</button>
          }
        </div>
      </form>
    </div>

    @if (error) { <div class="error">{{ error }}</div> }

    @for (task of tasks; track task.id) {
      <div class="card">
        <div class="row">
          <strong>{{ task.completed ? '✓ ' : '' }}{{ task.title }}</strong>
          <span class="spacer"></span>
          <button class="secondary" (click)="edit(task)">Edit</button>
          <button class="danger" (click)="remove(task.id)">Delete</button>
        </div>
        @if (task.description) { <p>{{ task.description }}</p> }
      </div>
    } @empty {
      <div class="card">No tasks yet. Add your first one above.</div>
    }
  `
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  editingId: number | null = null;
  error = '';
  form: TaskPayload = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.taskService.list().subscribe({
      next: tasks => this.tasks = tasks,
      error: () => this.error = 'Could not load tasks.'
    });
  }

  save(): void {
    const payload = { ...this.form };
    const request = this.editingId === null
      ? this.taskService.create(payload)
      : this.taskService.update(this.editingId, payload);

    request.subscribe({
      next: () => {
        this.resetForm();
        this.load();
      },
      error: () => this.error = 'Could not save task.'
    });
  }

  edit(task: Task): void {
    this.editingId = task.id;
    this.form = {
      title: task.title,
      description: task.description,
      completed: task.completed
    };
  }

  remove(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.error = 'Could not delete task.'
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = { title: '', description: '', completed: false };
  }
}

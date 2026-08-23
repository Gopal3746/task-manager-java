import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskPayload {
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly api = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Task[]>(this.api);
  }

  create(payload: TaskPayload) {
    return this.http.post<Task>(this.api, payload);
  }

  update(id: number, payload: TaskPayload) {
    return this.http.put<Task>(`${this.api}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log("entro al sercio de task")
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`, this.getHeaders());
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task, this.getHeaders());
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${task.taskID}`, task, this.getHeaders());
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, this.getHeaders());
  }
}

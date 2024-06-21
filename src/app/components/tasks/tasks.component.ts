import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { TaskModalComponent } from "../task-modal/task-modal.component";
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [CommonModule, TaskModalComponent]
})
export class TasksComponent {
  userEmail: string = '';
  tasks: any[] = [];

  modalTitle: string = 'Crear Tarea';
  modalMode: 'create' | 'update' = 'create';
  taskCurrent: any = {};

  constructor(private authService: AuthService, private router: Router,private taskService: TaskService, private toastService: ToastService) {}

  ngOnInit() {
    this.userEmail = this.authService.getUserEmail();
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      res => {
        res.map((item: { duedate: string; dueDate: string | number | Date; }) => {
          item.dueDate = formatDate(item.dueDate, 'yyyy-MM-dd', 'en');
        })
        this.tasks = res;
      },
      err => console.error(err)
    );
  }

  createTask(): void {
    this.modalTitle = 'Crear Tarea';
    this.modalMode = 'create';
    this.taskCurrent = {};
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  editTask(task: any): void {
    this.modalTitle = 'Actualizar Tarea';
    this.modalMode = 'update';
    task.duedate = formatDate(task.dueDate, 'yyyy-MM-dd', 'en');
    this.taskCurrent = JSON.parse(JSON.stringify(task));
    console.log(this.taskCurrent);
  }

  markAsCompleted(event: Event, task: any) {
    const checkbox = event.target as HTMLInputElement;
    task.status = checkbox.checked;
    this.taskService.updateTask(task).subscribe(
      res => this.loadTasks(),
      err => console.error(err)
    );
  }

  deleteTask(id: number) {
    Swal.fire({
      text: "¿Está seguro de eliminar esta tarea?",
      width: 400,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1171cd",
      color: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        this.taskService.deleteTask(id).subscribe(
          res => {
            this.toastService.showToast("Tarea eliminada correctamente.", "success");
            this.loadTasks();
          },
          err => console.error(err)
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}

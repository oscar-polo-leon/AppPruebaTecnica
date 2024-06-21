import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})

export class TaskModalComponent {
  @Output() updateTasks = new EventEmitter<void>();
  @ViewChild('myButtonClose') myButtonClose!: ElementRef;
  @Input() modalTitle: string = 'Crear Tarea';
  @Input() mode: 'create' | 'update' = 'create';
  @Input() taskCurrent: any =
  {
        taskID: '',
        title: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        duedate: '',
        status: '',
        userId: ''
  };


  constructor(private taskService: TaskService, private toastService: ToastService) { }

  createTask() {
    if(this.taskCurrent.title == "" || this.taskCurrent.description == "" || this.taskCurrent.duedate == "" || this.taskCurrent.title == undefined || this.taskCurrent.description == undefined || this.taskCurrent.duedate == undefined)
    {
      this.toastService.showToast("Faltan datos por ingresar","error");
      return;
    }
    this.taskCurrent.status = false;
    this.taskService.createTask(this.taskCurrent).subscribe(
      res => {
        this.toastService.showToast("Tarea creada.", "success");
        this.updateTasks.emit();
        if (this.myButtonClose) (this.myButtonClose.nativeElement as HTMLButtonElement).click();
      },
      err => {
        this.toastService.showToast("la tarea no pudo ser creada.", "error");
        if (this.myButtonClose) (this.myButtonClose.nativeElement as HTMLButtonElement).click();
      }
    );
  }

  updateTask() {
    if(this.taskCurrent.title == "" || this.taskCurrent.description == "" || this.taskCurrent.duedate == "" || this.taskCurrent.title == undefined || this.taskCurrent.description == undefined || this.taskCurrent.duedate == undefined)
      {
        this.toastService.showToast("Faltan datos por ingresar","error");
        return;
      }
    this.taskService.updateTask(this.taskCurrent).subscribe(
      res => {
        this.toastService.showToast( "Tarea actualizada.", "success");
        this.updateTasks.emit();
        if (this.myButtonClose) (this.myButtonClose.nativeElement as HTMLButtonElement).click();
      },
      err => {
        this.toastService.showToast( "la tarea no pudo ser actualizada.", "error");
        if (this.myButtonClose) (this.myButtonClose.nativeElement as HTMLButtonElement).click();
      }
    );
  }
}

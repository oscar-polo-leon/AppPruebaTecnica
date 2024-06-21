import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModalComponent } from './task-modal.component'; // Importa TaskModalComponent aquí
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../services/toast.service';
import { of, throwError } from 'rxjs';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask', 'updateTask']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);

    await TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ CommonModule, FormsModule, TaskModalComponent ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create task successfully', fakeAsync(() => {
    component.taskCurrent = {
      title: 'Test Task',
      description: 'Test Description',
      duedate: '2024-06-30',
      status: false,
      userId: 'user123'
    };
    taskService.createTask.and.returnValue(of({}));
    spyOn(component.updateTasks, 'emit');

    component.createTask();
    tick();

    expect(taskService.createTask).toHaveBeenCalledWith(component.taskCurrent);
    expect(toastService.showToast).toHaveBeenCalledWith('Tarea creada.', 'success');
    expect(component.updateTasks.emit).toHaveBeenCalled();
  }));

  it('should handle create task error', fakeAsync(() => {
    component.taskCurrent = {
      title: 'Test Task',
      description: 'Test Description',
      duedate: '2024-06-30',
      status: false,
      userId: 'user123'
    };
    taskService.createTask.and.returnValue(throwError('Error'));
    spyOn(component.updateTasks, 'emit');

    component.createTask();
    tick();

    expect(taskService.createTask).toHaveBeenCalledWith(component.taskCurrent);
    expect(toastService.showToast).toHaveBeenCalledWith('la tarea no pudo ser creada.', 'error');
    expect(component.updateTasks.emit).not.toHaveBeenCalled();
  }));

  it('should update task successfully', fakeAsync(() => {
    component.taskCurrent = {
      taskID: 'task123',
      title: 'Test Task',
      description: 'Test Description',
      duedate: '2024-06-30',
      status: false,
      userId: 'user123'
    };
    taskService.updateTask.and.returnValue(of({}));
    spyOn(component.updateTasks, 'emit');

    component.updateTask();
    tick();

    expect(taskService.updateTask).toHaveBeenCalledWith(component.taskCurrent);
    expect(toastService.showToast).toHaveBeenCalledWith('Tarea actualizada.', 'success');
    expect(component.updateTasks.emit).toHaveBeenCalled();
  }));

  it('should handle update task error', fakeAsync(() => {
    component.taskCurrent = {
      taskID: 'task123',
      title: 'Test Task',
      description: 'Test Description',
      duedate: '2024-06-30',
      status: false,
      userId: 'user123'
    };
    taskService.updateTask.and.returnValue(throwError('Error'));
    spyOn(component.updateTasks, 'emit');

    component.updateTask();
    tick();

    expect(taskService.updateTask).toHaveBeenCalledWith(component.taskCurrent);
    expect(toastService.showToast).toHaveBeenCalledWith('la tarea no pudo ser actualizada.', 'error');
    expect(component.updateTasks.emit).not.toHaveBeenCalled();
  }));

  it('should handle missing data on createTask()', () => {
    component.taskCurrent = { title: '', description: '', duedate: '', status: false, userId: '' };

    component.createTask();

    expect(toastService.showToast).toHaveBeenCalledWith('Faltan datos por ingresar', 'error');
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should handle missing data on updateTask()', () => {
    component.taskCurrent = { taskID: '', title: '', description: '', duedate: '', status: false, userId: '' };

    component.updateTask();

    expect(toastService.showToast).toHaveBeenCalledWith('Faltan datos por ingresar', 'error');
    expect(taskService.updateTask).not.toHaveBeenCalled();
  });
});

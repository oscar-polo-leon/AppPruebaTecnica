import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../../services/task.service';
import { TasksComponent } from './tasks.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { TaskModalComponent } from '../task-modal/task-modal.component';

describe('TaskComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let authService: AuthService;
  let router: Router;
  let taskService: TaskService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        TaskModalComponent 
      ],
      providers: [
        AuthService,
        TaskService,
        ToastService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    taskService = TestBed.inject(TaskService);
    toastService = TestBed.inject(ToastService);

    spyOn(authService, 'getUserEmail').and.returnValue('test@example.com');
    spyOn(taskService, 'getTasks').and.returnValue(of([
      { id: 1, title: 'Task 1', dueDate: new Date() },
      { id: 2, title: 'Task 2', dueDate: new Date() }
    ]));

    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(TaskService).toBeTruthy();
  });

  it('should load tasks on init', () => {
    component.ngOnInit();
    expect(component.userEmail).toBe('test@example.com');
    expect(component.tasks.length).toBe(2);
  });

  it('should set modal mode to create and clear taskCurrent on createTask()', () => {
    component.createTask();
    expect(component.modalMode).toBe('create');
    expect(component.taskCurrent).toEqual({});
  });

  it('should navigate to login page on logout()', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to tasks page on navigateToTasks()', () => {
    component.navigateToTasks();
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

});

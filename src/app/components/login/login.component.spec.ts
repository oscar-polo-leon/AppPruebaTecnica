import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn', 'setToken']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);

    await TestBed.configureTestingModule({
      imports: [ FormsModule ], 
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to tasks if user is already logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });

  it('should login successfully', fakeAsync(() => {
    const credentials = { email: 'test@example.com', password: 'password' };
    authService.login.and.returnValue(of({ token: 'dummy-token' }));
    const navigateSpy = spyOn(router, 'navigate');

    component.credentials = credentials;
    component.login();
    tick();

    expect(authService.login).toHaveBeenCalledWith(credentials);
    expect(authService.setToken).toHaveBeenCalledWith('dummy-token');
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  }));


  it('should navigate to register page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateToRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['/register']);
  });

});

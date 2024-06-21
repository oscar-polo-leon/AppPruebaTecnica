import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('token'); 
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should register user', () => {
    const mockUser = { username: 'testuser', email: 'test@example.com', password: 'password' };
    const mockResponse = { success: true, message: 'User registered successfully' };

    authService.register(mockUser).subscribe(
      response => {
        expect(response).toEqual(mockResponse);
      },
      fail
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/Auth/register`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });


  it('should set and get token', () => {
    const dummyToken = 'dummy-token';
    authService.setToken(dummyToken);
    expect(authService.getToken()).toEqual(dummyToken);
  });

  it('should check if user is logged in', () => {
    expect(authService.isLoggedIn()).toBeFalsy();
    authService.setToken('dummy-token');
    expect(authService.isLoggedIn()).toBeTruthy();

    localStorage.removeItem('token');
    expect(authService.isLoggedIn()).toBeFalsy();
  });

  it('should logout user', () => {
    authService.setToken('dummy-token');
    authService.logout();
    expect(authService.getToken()).toBeNull();
  });

  it('should check if token is expired', () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjJ9.8h2Ew4_Eu1obXH0ECZDyM7r0EPOmLxT69S3bHq-7mzU'; // Token expirado

    localStorage.setItem('token', expiredToken);
    expect(authService.isTokenExpired()).toBeTruthy();
  });

});

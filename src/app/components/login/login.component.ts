import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/tasks']);
    }
  }

  login() {
    if(this.credentials.email == "" || this.credentials.password == "")
    {
      this.toastService.showToast("Faltan datos por ingresar", "error");
      return;
    }
    this.authService.login(this.credentials).subscribe(
      (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/tasks']);
      },
      err => this.toastService.showToast("Error. Por favor contacte a sóporte técnico", "error")
    );
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}

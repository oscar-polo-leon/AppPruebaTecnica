import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: any = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  register() {
    if(this.user.username == "" || this.user.email == "" || this.user.password == "")
      {
        this.toastService.showToast("Faltan datos por ingresar","error");
        return;
      }
    this.authService.register(this.user).subscribe(
      res => {
      this.toastService.showToast("Usuario creado correctamente","success");
      this.router.navigate(['/login'])
      },
      err => {
        var errors = err.error.map((item: { description: any; }) => item.description)
        console.log(err);
        this.toastService.showToast(errors[0],"error");
      }
    );
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}

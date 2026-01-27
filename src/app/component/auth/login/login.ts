import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LoginRequest } from '../../../model/login-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup;
  mensajeError: string = '';

  constructor() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (usuario) => {
          console.log('Login exitoso:', usuario);
          this.authService.guardarUsuario(usuario);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.mensajeError = 'Usuario o contraseña incorrectos';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    if (this.authService.estaLogueado()) {
      this.router.navigate(['/dashboard']);
    }
  }
}

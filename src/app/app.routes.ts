import { Routes } from '@angular/router';
import { Login } from './component/auth/login/login';
import { Registro } from './component/auth/registro/registro';
import { Home } from './component/dashboard/home/home';
 
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Registro },
  { path: 'home', component: Home },
  { path: '**', redirectTo: '/login' }
];
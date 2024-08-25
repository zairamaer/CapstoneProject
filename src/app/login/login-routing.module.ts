import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { SignupPage } from '../signup/signup.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}

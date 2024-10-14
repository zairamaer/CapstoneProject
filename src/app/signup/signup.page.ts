import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  apiUrl = environment.apiUrl + "/register";

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async onSignup() {
    if (this.signupForm.invalid) {
      await this.showToast('Please fill out all required fields correctly.');
      return;
    }

    const { name, email, password, password_confirmation } = this.signupForm.value;

    if (password !== password_confirmation) {
      await this.showToast('Passwords do not match.');
      return;
    }

    const payload = {
      name,
      email,
      password,
      password_confirmation,
    };

    this.http.post(this.apiUrl, payload).subscribe(
      async (response: any) => {
        // Handle successful registration response
        await this.showToast('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      async (error) => {
        // Handle error response
        const errorMessage = error?.error?.message || 'Registration failed. Please try again.';
        await this.showToast(errorMessage);
      }
    );
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}

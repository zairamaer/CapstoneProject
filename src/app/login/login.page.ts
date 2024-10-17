import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  apiUrl = environment.apiUrl + "/login";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  async login() {
    // Check if the form is valid before submitting.
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.http.post(this.apiUrl, formData).subscribe(
        async (response: any) => {
          console.log('Login successful', response);

          // Store the access_token received in local storage.
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user_id', response.data.user.id);

          // Show a success message.
          const toast = await this.toastController.create({
            message: 'Login successful!',
            duration: 2000,
            color: 'success'
          });
          toast.present();

          // Navigate to the Tabs page after successful login.
          this.router.navigate(['/tabs']);
        },
        async (error) => {
          console.error('Login error', error);
          // Show an error message if login fails.
          const toast = await this.toastController.create({
            message: 'Login failed. Please check your credentials.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    } else {
      // Show a toast message if form is invalid.
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields.',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
    }
  }

}

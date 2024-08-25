import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router) { }

  onSignup() {
    // Handle your sign-up logic here, e.g., form validation, API call, etc.
    // If successful, navigate to the login page.

    // Example: After successful signup
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}

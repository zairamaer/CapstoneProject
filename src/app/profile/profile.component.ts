import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',         // Static name
    email: 'johndoe@example.com', // Static email
    phone: '123-456-7890'     // Static phone number
  };

  constructor() { }

  ngOnInit() {}
}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  notificationsEnabled: boolean = false;

  constructor(private navCtrl: NavController) {}

  toggleNotifications(event: any) {
    this.notificationsEnabled = event.detail.checked;
  }

  // Method to handle time changes
  onTimeChange(event: any) {
    console.log('Selected time:', event.detail.value);
  }

  // Handle the logout functionality
  logout() {
    // Clear authentication tokens or user data from local storage
    localStorage.removeItem('access_token'); // Replace with your token/key name

    // Optionally, you can add any additional cleanup logic here

    // Redirect to login page
    this.navCtrl.navigateRoot('/login');
  }
}

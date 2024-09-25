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
    // Add your logout logic here, e.g., clearing authentication tokens, etc.
    // Redirect to login page or home page
    this.navCtrl.navigateRoot('/login'); 
  }
}

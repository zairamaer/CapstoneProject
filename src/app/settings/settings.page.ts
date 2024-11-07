import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  notificationsEnabled: boolean = false;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  toggleNotifications(event: any) {
    this.notificationsEnabled = event.detail.checked;
  }

  // Method to handle time changes
  onTimeChange(event: any) {
    console.log('Selected time:', event.detail.value);
  }

  // Method to show confirmation alert before logging out
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout canceled');
          },
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
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

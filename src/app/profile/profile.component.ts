import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the import path as needed
import { ToastController } from '@ionic/angular'; // Import ToastController

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    phone: '',
    profile_picture: null // Initialize the profile_picture property
  };

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private toastController: ToastController) {}

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo() {
    this.authService.getProfile().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.user = response.data; // Update user with response data
        } else {
          this.presentToast('Failed to fetch profile information', 'danger');
          console.error('Failed to fetch profile information');
        }
      },
      (error) => {
        this.presentToast('Error fetching profile info', 'danger');
        console.error('Error fetching profile info', error);
      }
    );
  }

  async updateProfileInfo() {
    try {
      const response = await this.authService.updateProfile(this.user).toPromise();
      if (response.status === 'success') {
        const toast = await this.toastController.create({
          message: 'Profile updated successfully',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.user = response.data; // Update user with response data if needed
      } else {
        const toast = await this.toastController.create({
          message: 'Failed to update profile',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error updating profile info',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error('Error updating profile info', error);
    }
  }

  async updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'New password and confirm password do not match',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const passwordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };

    try {
      const response = await this.authService.updatePassword(passwordData).toPromise();
      if (response.status === 'success') {
        const toast = await this.toastController.create({
          message: 'Password updated successfully',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = ''; // Reset password fields on success
      } else {
        const toast = await this.toastController.create({
          message: 'Failed to update password',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error updating password',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error('Error updating password', error);
    }
  }

  // Method to handle file selection
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        const response = await this.authService.uploadProfilePicture(formData).toPromise();
        if (response.status === 'success') {
          this.user.profile_picture = response.data.profile_picture; // Update user profile picture
          const toast = await this.toastController.create({
            message: 'Profile picture updated successfully',
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.getProfileInfo();
        } else {
          const toast = await this.toastController.create({
            message: 'Failed to upload profile picture',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error uploading profile picture',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        console.error('Error uploading profile picture', error);
      }
    }
  }

  // Helper method to present toast messages
  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}

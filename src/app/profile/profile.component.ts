import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the import path as needed
import { ToastController } from '@ionic/angular';

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
    profile_picture: null, // Initialize the profile_picture property
  };

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo() {
    this.authService.getProfile().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.user = response.data; // Update user with response data
        } else {
          this.presentToast(response.message || 'Failed to fetch profile information', 'danger');
        }
      },
      (error) => {
        this.presentToast(error.message || 'Error fetching profile info', 'danger');
        console.error('Error fetching profile info', error);
      }
    );
  }

  updateProfileInfo() {
    this.authService.updateProfile(this.user).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.presentToast(response.message || 'Profile updated successfully', 'success');
          this.user = response.data; // Update user with response data if needed
          this.getProfileInfo();
        } else {
          this.presentToast(response.error.message || 'Failed to update profile', 'danger');
        }
      },
      (error) => {
        this.presentToast(error.error.message || 'Error updating profile info', 'danger');
        console.error('Error updating profile info', error);
      }
    );
  }

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.presentToast('New password and confirm password do not match', 'danger');
      return;
    }

    const passwordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };

    this.authService.updatePassword(passwordData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.presentToast(response.message || 'Password updated successfully', 'success');
          this.resetPasswordFields();
        } else {
          this.presentToast(response.error.message || 'Failed to update password', 'danger');
        }
      },
      (error) => {
        this.presentToast(error.error.message || 'Error updating password', 'danger');
        console.error('Error updating password', error);
      }
    );
  }

  private resetPasswordFields() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('profile_picture', file);

      this.authService.uploadProfilePicture(formData).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.user.profile_picture = response.data.profile_picture; // Update user profile picture
            this.presentToast(response.message || 'Profile picture updated successfully', 'success');
            this.getProfileInfo();
          } else {
            this.presentToast(response.error.message || 'Failed to upload profile picture', 'danger');
          }
        },
        (error) => {
          this.presentToast(error.error.message || 'Error uploading profile picture', 'danger');
          console.error('Error uploading profile picture', error);
        }
      );
    }
  }

  // Helper method to present toast messages
  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}

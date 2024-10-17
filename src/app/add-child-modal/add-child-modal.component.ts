import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-add-child-modal',
  templateUrl: './add-child-modal.component.html',
  styleUrls: ['./add-child-modal.component.scss']
})
export class AddChildModalComponent {
  childName: string = '';
  childDob: string = '';
  calculatedAge: string = '';
  childGender: string = '';

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController // Inject ToastController
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async addChild() {
    if (this.childName && this.childDob) {
      const childData = {
        name: this.childName,
        birth_date: this.childDob, // Assuming the backend accepts 'birth_date'
        gender: this.childGender
      };

      // Call the storeChild method from AuthService
      this.authService.storeChild(childData).subscribe(
        async (result) => {
          this.modalController.dismiss({
            name: this.childName,
            age: this.calculatedAge,
            gender: this.childGender
          });

          // Show a success message.
          const toast = await this.toastController.create({
            message: 'Child added successfully!',
            duration: 2000,
            color: 'success'
          });
          toast.present();
        },
        async (error) => {
          console.error('Error adding child', error); // Handle error

          // Show an error message.
          const toast = await this.toastController.create({
            message: 'Failed to add child. Please try again.',
            duration: 2000,
            color: 'danger' // Use danger color for error messages
          });
          toast.present();
        }
      );
    } else {
      console.log('Name and Date of Birth are required');
    }
  }

  // Calculate the age based on date of birth
  calculateAge() {
    if (!this.childDob) return;

    const birthDate = new Date(this.childDob);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0 && months > 0) {
      this.calculatedAge = `${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      this.calculatedAge = `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      this.calculatedAge = `${months} month${months > 1 ? 's' : ''}`;
    } else {
      this.calculatedAge = '0 months';
    }
  }
}

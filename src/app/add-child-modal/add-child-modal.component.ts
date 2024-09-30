import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  addChild() {
    if (this.childName && this.childDob) {
      this.modalController.dismiss({
        name: this.childName,
        age: this.calculatedAge,
        gender: this.childGender
      });
    } else {
      // Handle validation error
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

  // Adjust the year and month if the current date is before the birth date
  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Get last day of the previous month
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Display logic based on the age calculated
  if (years > 0 && months > 0) {
    this.calculatedAge = `${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`;
  } else if (years > 0) {
    this.calculatedAge = `${years} year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    this.calculatedAge = `${months} month${months > 1 ? 's' : ''}`;
  } else {
    this.calculatedAge = '0 months'; // If there is no age calculated, default to 0
  }
}

}

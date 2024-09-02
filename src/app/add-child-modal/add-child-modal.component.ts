import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-child-modal',
  templateUrl: './add-child-modal.component.html',
  styleUrls: ['./add-child-modal.component.scss']
})
export class AddChildModalComponent {
  childName: string = '';
  childAge: string = '';
  childGender: string = '';
  ageUnit: string = ''; // New property for age unit

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  addChild() {
    if (this.childName && this.childAge && this.ageUnit) {
      this.modalController.dismiss({
        name: this.childName,
        age: `${this.childAge} ${this.ageUnit}`, // Include the age unit
        gender: this.childGender
      });
    } else {
      // Handle validation error
      console.log('Name, age, and age unit are required');
    }
  }
}

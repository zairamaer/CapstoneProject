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

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  addChild() {
    if (this.childName && this.childAge) {
      this.modalController.dismiss({
        name: this.childName,
        age: this.childAge
      });
    } else {
      // Handle validation error
      console.log('Name and age are required');
    }
  }
}

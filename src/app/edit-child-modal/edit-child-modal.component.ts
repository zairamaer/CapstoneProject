import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-child-modal',
  templateUrl: './edit-child-modal.component.html',
  styleUrls: ['./edit-child-modal.component.scss'],
})
export class EditChildModalComponent {
  @Input() child: { name: string; age: number; gender: string } = { name: '', age: 0, gender: '' }; // Initialize child

  constructor(private modalController: ModalController) {}

  saveChanges() {
    this.modalController.dismiss(this.child);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

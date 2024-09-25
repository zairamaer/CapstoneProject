import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditChildModalComponent } from '../edit-child-modal/edit-child-modal.component';
import { AddChildModalComponent } from '../add-child-modal/add-child-modal.component';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  children: { name: string, age: number, gender: string }[] = [
    { name: 'Child 1', age: 5, gender: 'Male' },
    { name: 'Child 2', age: 7, gender: 'Female' }
  ];

  constructor(private modalController: ModalController) {}

  async onNewButtonClick() {
    const modal = await this.modalController.create({
      component: AddChildModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Add the new child to the children array
        this.children.push(result.data);
      }
    });

    return await modal.present();
  }

  async editChild(child: { name: string, age: number, gender: string }) {
    const modal = await this.modalController.create({
      component: EditChildModalComponent,
      componentProps: { child: { ...child } }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const updatedChild = result.data;
        const index = this.children.findIndex(c => c === child);
        if (index > -1) {
          this.children[index] = updatedChild;
        }
      }
    });

    return await modal.present();
  }
}

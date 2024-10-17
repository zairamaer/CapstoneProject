import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Import the AuthService
import { EditChildModalComponent } from '../edit-child-modal/edit-child-modal.component';
import { AddChildModalComponent } from '../add-child-modal/add-child-modal.component';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage implements OnInit {
  children: { id: string, name: string, age: number, gender: string }[] = [];
  loading: boolean = false; // Add loading flag

  constructor(
    private modalController: ModalController,
    private authService: AuthService, // Inject AuthService
    private toastController: ToastController,
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit() {
    this.loadChildren(); // Call the loadChildren method on component initialization
  }

  loadChildren() {
    this.loading = true; // Start loading
    this.authService.getChildrenList().subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.children = response.data; // Assuming the response structure includes a 'data' field
        } else {
          console.error('Failed to fetch children list', response);
        }
        this.loading = false; // Stop loading once data is fetched
      },
      (error) => {
        console.error('Error fetching children list', error);
        this.loading = false; // Stop loading on error
      }
    );
  }

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

  async confirmRemoveChild(childId: string, childName: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Removal',
      message: `Are you sure you want to remove ${childName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Removal cancelled');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.deleteChild(childId);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteChild(childId: string) {
    this.authService.deleteChild(childId).subscribe(
      async (result) => {
        // Handle successful deletion
        const toast = await this.toastController.create({
          message: 'Child deleted successfully!',
          duration: 2000,
          color: 'success'
        });
        toast.present();

        this.loadChildren();
      },
      async (error) => {
        console.error('Error deleting child', error);
        const toast = await this.toastController.create({
          message: 'Failed to delete child. Please try again.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }
}

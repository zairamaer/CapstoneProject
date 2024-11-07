import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { AuthService } from '../services/auth.service'; // Import the AuthService
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  activities: { id: string, title: string, date: string, time: string, childId: number, category: string }[] = [];
  filteredActivities: { id: string, title: string, date: string, time: string, childId: number, category: string }[] = [];
  children: { id: string, name: string, age: number, gender: string, photoUrl: string }[] = [];
  selectedChild: any;
  selectedCategory: string = 'All';

  constructor(private modalController: ModalController, private authService: AuthService, private toastController: ToastController) {}

  ngOnInit() {
    this.loadChildren(); // Load the children list on component initialization
  }

  loadChildren() {
    this.authService.getChildrenList().subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.children = response.data; // Assuming the response structure includes a 'data' field
          if (this.children.length > 0) {
            this.selectedChild = this.children[0]; // Set the first child as selected
            this.fetchFilteredChildActivities(); // Fetch activities for the selected child
          }
        } else {
          console.error('Failed to fetch children list', response);
        }
      },
      (error) => {
        console.error('Error fetching children list', error);
      }
    );
  }

  fetchFilteredChildActivities() {
    if (this.selectedChild) {
      this.authService.getFilteredChildActivities(this.selectedChild.id, "", this.selectedCategory).subscribe(
        (response) => {
          if (response && response.status === 'success') {
            this.activities = response.data || [];
            this.filteredActivities = [...this.activities]; // Set filteredActivities initially
            console.log('Activities:', this.activities); // Debugging
            console.log('Filtered Activities:', this.filteredActivities); // Debugging
            this.filterActivities(); // Call this only if filters are applied
          } else {
            console.error('Failed to fetch activities', response);
          }
        },
        (error) => {
          console.error('Error fetching activities', error);
        }
      );
    }
  }

  async openAddActivityModal() {
    const modal = await this.modalController.create({
      component: AddActivityComponent,
      componentProps: { selectedChildId: this.selectedChild.id },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.activities.push({ ...result.data, childId: this.selectedChild.id });
        this.presentToast('Activity added successfully!', 'success');
        this.filterActivities();
      }
      this.fetchFilteredChildActivities();
    });

    return await modal.present();
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const ampm = +hours >= 12 ? 'PM' : 'AM';
    const hour12 = (+hours % 12) || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  deleteActivity(index: string) {
    // this.activities.splice(index, 1);
    if (this.selectedChild) {
      this.authService.deleteActivity(this.selectedChild.id, index).subscribe(
        response => {
          this.presentToast(response.message, 'success');
          this.fetchFilteredChildActivities();
        },
        error => {
          // Handle error
          console.error('Error deleting activity', error);
        }
      );
    }
  }

  onChildSelect(event: any) {
    this.selectedChild = event.detail.value;
    this.fetchFilteredChildActivities();
  }

  onCategorySelect(event: any) {
    this.selectedCategory = event.detail.value;
    this.fetchFilteredChildActivities();
  }

  filterActivities() {
    console.log('Selected Category:', this.selectedCategory);
    console.log('Selected Child:', this.selectedChild);

    if (this.selectedChild) {
      this.filteredActivities = this.activities.filter(activity => {
        const matchesChild = activity.childId === this.selectedChild.id;
        const matchesCategory = this.selectedCategory === 'all' || activity.category === this.selectedCategory;
        return matchesChild && matchesCategory;
      });
    } else {
      this.filteredActivities = this.activities.filter(activity => {
        return this.selectedCategory === 'all' || activity.category === this.selectedCategory;
      });
    }

    console.log('Filtered Activities:', this.filteredActivities);
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

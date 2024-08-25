import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddActivityComponent } from '../add-activity/add-activity.component'; // Adjust the path as needed

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  activities: { title: string, date: string, time: string, childId: number }[] = [];
  filteredActivities: { title: string, date: string, time: string }[] = [];
  children = [
    { id: 1, name: 'Child 1', photoUrl: 'path/to/photo1.jpg' },
    { id: 2, name: 'Child 2', photoUrl: 'path/to/photo2.jpg' },
    // Add more children as needed
  ];
  selectedChild: any;

  constructor(private modalController: ModalController) {
    // Initialize the selectedChild with a default child if needed
    this.selectedChild = this.children[0]; // Example: set the first child as default
    this.filterActivities(); // Filter activities based on the default child
  }

  async openAddActivityModal() {
    const modal = await this.modalController.create({
      component: AddActivityComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Add the new activity to the list and filter
        this.activities.push({ ...result.data, childId: this.selectedChild.id });
        this.filterActivities();
      }
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

  deleteActivity(index: number) {
    this.activities.splice(index, 1);
    this.filterActivities(); // Re-filter activities after deletion
  }

  onChildSelect(event: any) {
    this.selectedChild = event.detail.value;
    this.filterActivities(); // Update displayed activities based on the selected child
    console.log('Selected child:', this.selectedChild);
  }

  private filterActivities() {
    if (this.selectedChild) {
      // Filter activities to only show those for the selected child
      this.filteredActivities = this.activities.filter(activity => activity.childId === this.selectedChild.id);
    } else {
      // Show all activities if no child is selected (optional)
      this.filteredActivities = this.activities;
    }
  }
}

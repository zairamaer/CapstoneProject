import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  activities: { title: string, date: string, time: string, childId: number, category: string }[] = [];
  filteredActivities: { title: string, date: string, time: string, category: string }[] = [];
  children = [
    { id: 1, name: 'Child 1', photoUrl: 'path/to/photo1.jpg' },
    { id: 2, name: 'Child 2', photoUrl: 'path/to/photo2.jpg' },
  ];
  selectedChild: any;
  selectedCategory: string = 'all';

  constructor(private modalController: ModalController) {
    this.selectedChild = this.children[0];
    this.filterActivities();
  }

  async openAddActivityModal() {
    console.log('Open Add Activity Modal'); // Debugging line
    const modal = await this.modalController.create({
      component: AddActivityComponent,
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Activity Data:', result.data); // Debugging line
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
    this.filterActivities();
  }

  onChildSelect(event: any) {
    this.selectedChild = event.detail.value;
    this.filterActivities();
  }

  filterActivities() {
    if (this.selectedChild) {
      this.filteredActivities = this.activities.filter(activity => {
        const matchesChild = activity.childId === this.selectedChild.id;
        const matchesCategory = this.selectedCategory === 'all' || activity.category === this.selectedCategory;
        return matchesChild && matchesCategory;
      });
    } else {
      this.filteredActivities = this.activities;
    }
  }
}

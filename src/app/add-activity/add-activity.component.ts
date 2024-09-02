import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
})
export class AddActivityComponent implements OnInit {
  activityTitle: string = '';
  activityDateTime: string = '';
  activityCategory: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.setDefaultDateTime();
  }

  setDefaultDateTime() {
    const now = new Date();
    this.activityDateTime = now.toISOString();
  }

  close() {
    this.modalController.dismiss();
  }

  async saveActivity() {
    console.log('Save Activity Called'); // Debugging line
    if (!this.activityTitle || !this.activityDateTime || !this.activityCategory) {
      console.error('Validation error: missing data');
      return;
    }
  
    const [date, time] = this.activityDateTime.split('T');
    const activityData = {
      title: this.activityTitle,
      date: date,
      time: time.split('.')[0],
      category: this.activityCategory,
    };
  
    await this.modalController.dismiss(activityData);
  }
  

  onDateTimeChange(event: any) {
    this.activityDateTime = event.detail.value as string;
  }
}

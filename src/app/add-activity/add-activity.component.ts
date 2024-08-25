import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
})
export class AddActivityComponent implements OnInit {

  activityTitle: string = '';
  activityDateTime: string = ''; // This will store date and time in ISO format

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.setDefaultDateTime();
  }

  setDefaultDateTime() {
    const now = new Date();
    this.activityDateTime = now.toISOString(); // Default to current date and time
  }

  close() {
    this.modalController.dismiss();
  }

  async saveActivity() {
    const [date, time] = this.activityDateTime.split('T');
    const activityData = {
      title: this.activityTitle,
      date: date, // YYYY-MM-DD format
      time: time.split('.')[0] // HH:mm:ss format without milliseconds
    };

    // Pass the data back to the modal
    await this.modalController.dismiss(activityData);
  }

  onDateTimeChange(event: any) {
    this.activityDateTime = event.detail.value as string; // This will be in ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
  }
}

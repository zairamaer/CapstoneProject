import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
})
export class AddActivityComponent implements OnInit {
  @Input() selectedChildId!: string; // Use definite assignment assertion
  children: { id: string, name: string, age: number, gender: string }[] = [];
  activityTitle: string = '';
  activityDateTime: string = '';
  activityCategory: string = '';

  constructor(private modalController: ModalController, private authService: AuthService, private toastController: ToastController) {}

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

  saveActivity() {
    console.log('Save Activity Called');
    if (!this.activityTitle || !this.activityDateTime || !this.activityCategory || !this.selectedChildId) {
      console.error('Validation error: missing data');
      return;
    }

    // const [date, time] = this.activityDateTime.split('T');
    const activityData = {
      activityTitle: this.activityTitle,
      activityDateTime: this.activityDateTime,
      activityCategory: this.activityCategory,
    };

    // Call storeChildActivity with selectedChildId and activity data
    this.authService.storeChildActivity(this.selectedChildId, activityData).subscribe(
      (response) => {
        if (response && response.status === 'success') {
          console.log('Activity stored successfully:', response.data);
          this.modalController.dismiss(activityData); // Dismiss modal with activity data
        } else {
          console.error('Failed to store activity:', response);
        }
      },
      (error) => {
        console.error('Error storing activity:', error);
      }
    );
  }

  onDateTimeChange(event: any) {
    this.activityDateTime = event.detail.value as string;
  }
}

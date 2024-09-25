import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';  // Import NavController

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  openMilestones: { [key: string]: boolean } = {};

  constructor(private navCtrl: NavController) {}  // Inject NavController

  toggleMilestones(milestoneId: string) {
    this.openMilestones[milestoneId] = !this.openMilestones[milestoneId];
  }

  isMilestoneOpen(milestoneId: string): boolean {
    return this.openMilestones[milestoneId] || false;
  }

  // Add the openSettings method to navigate to the settings page
  openSettings() {
    this.navCtrl.navigateForward('/settings');
  }
}

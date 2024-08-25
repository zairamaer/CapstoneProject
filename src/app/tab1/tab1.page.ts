import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  // Define the type of openMilestones object
  openMilestones: { [key: string]: boolean } = {};

  // Method to toggle the visibility of milestones
  toggleMilestones(id: string) {
    this.openMilestones[id] = !this.openMilestones[id];
  }

  // Method to check if a milestone is open
  isMilestoneOpen(id: string): boolean {
    return this.openMilestones[id] || false;
  }
}

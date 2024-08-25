import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddChildModalComponent } from '../add-child-modal/add-child-modal.component'; // Adjust path if necessary

interface Milestone {
  description: string;
  status: string;
}

interface Category {
  name: string;
  achieved: number;
  total: number;
  milestones: Milestone[];
}

type AgeRange = '2months' | '4months' | '6months';

interface Categories {
  [key: string]: Category[];
}

interface Child {
  id: number;
  name: string;
  age: string; // e.g., '2 months', '4 months', '6 months'
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  totalMilestones = 0;
  totalAchieved = 0;
  selectedAge: AgeRange = '2months'; // Default age range
  filteredCategories: Category[] = [];
  selectedChildName: string = ''; // Property to hold the selected child's name
  selectedChildAge: string = '';  // Property to hold the selected child's age

  // Define the list of children
  children: Child[] = [
    { id: 1, name: 'Child 1', age: '2 months' },
    { id: 2, name: 'Child 2', age: '4 months' },
    { id: 3, name: 'Child 3', age: '6 months' }
    // Add more children as needed
  ];

  categories: Categories = {
    '2months': [
      {
        name: 'Social/Emotional',
        achieved: 0,
        total: 1,
        milestones: [
          { description: 'Plays next to other children and sometimes plays with them', status: 'not-yet' }
        ]
      },
      {
        name: 'Language',
        achieved: 0,
        total: 2,
        milestones: [
          { description: 'Responds to own name', status: 'not-yet' },
          { description: 'Uses gestures like pointing or waving', status: 'not-yet' }
        ]
      }
    ],
    '4months': [
      {
        name: 'Social/Emotional',
        achieved: 0,
        total: 2,
        milestones: [
          { description: 'Follows simple routines when told', status: 'not-yet' },
          { description: 'Shows you what she can do by saying, “Look at me!”', status: 'not-yet' }
        ]
      },
      {
        name: 'Language',
        achieved: 0,
        total: 3,
        milestones: [
          { description: 'Understands simple words like “no” or “bye-bye”', status: 'not-yet' },
          { description: 'Uses gestures like pointing or waving', status: 'not-yet' },
          { description: 'Says one or two words', status: 'not-yet' }
        ]
      }
    ],
    '6months': [
      {
        name: 'Cognitive',
        achieved: 0,
        total: 3,
        milestones: [
          { description: 'Looks at pictures in books or on screen', status: 'not-yet' },
          { description: 'Explores objects in many ways', status: 'not-yet' },
          { description: 'Knows the function of everyday items like a spoon', status: 'not-yet' }
        ]
      },
      {
        name: 'Movement',
        achieved: 0,
        total: 4,
        milestones: [
          { description: 'Pulls up to stand', status: 'not-yet' },
          { description: 'Walks holding onto furniture', status: 'not-yet' },
          { description: 'Can stand alone', status: 'not-yet' },
          { description: 'Crawls', status: 'not-yet' }
        ]
      }
    ]
  };

  constructor(private modalController: ModalController) { // Inject ModalController
    this.filterMilestonesByAge(); // Initialize with default age range
  }

  // Method to handle child selection
  openChildModal(event: any) {
    const selectedChildId = event.detail.value;
    const selectedChild = this.children.find(child => child.id === selectedChildId);
    this.selectedChildName = selectedChild ? selectedChild.name : '';
    this.selectedChildAge = selectedChild ? selectedChild.age : '';
    // Implement logic to open modal or handle selection
  }

  // Method to handle the new button click
  async onNewButtonClick() {
    const modal = await this.modalController.create({
      component: AddChildModalComponent
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Add new child to the list
        const newChild: Child = {
          id: this.children.length + 1, // Simple ID generation
          name: result.data.name,
          age: result.data.age
        };
        this.children.push(newChild);
        // Optionally, update the dropdown or any other UI elements
      }
    });

    return await modal.present();
  }

  // Method to update milestone status
  updateMilestoneStatus(categoryIndex: number, milestoneIndex: number, status: any) {
    const statusString = String(status);
    this.filteredCategories[categoryIndex].milestones[milestoneIndex].status = statusString;
    this.updateCategoryAchievements(categoryIndex); // Update category achievements
    this.updateAchievedCount(); // Update overall achievements
  }

  // Method to update the achievements for a specific category
  updateCategoryAchievements(categoryIndex: number) {
    const category = this.filteredCategories[categoryIndex];
    category.achieved = category.milestones.filter((milestone: Milestone) => milestone.status !== 'not-yet').length;
  }

  // Method to update the total achieved milestones
  updateAchievedCount() {
    this.totalAchieved = this.filteredCategories.reduce((total, category) => {
      return total + category.achieved;
    }, 0);
  }

  // Method to filter milestones based on selected age range
  filterMilestonesByAge() {
    this.filteredCategories = this.categories[this.selectedAge] || [];
    this.calculateTotals(); // Recalculate totals based on filtered categories
  }

  // Method to calculate total milestones and achievements based on filtered categories
  calculateTotals() {
    this.totalMilestones = this.filteredCategories.reduce((total, category) => {
      return total + category.total;
    }, 0);

    this.updateAchievedCount(); // Initial calculation of total achievements
  }
}

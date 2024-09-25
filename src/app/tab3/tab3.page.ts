import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddChildModalComponent } from '../add-child-modal/add-child-modal.component';

interface Milestone {
  description: string;
  status: string;
}

interface Category {
  id: number;
  name: string;
  milestones: Milestone[];
  total?: number;
  achieved?: number;
}

interface Categories {
  [key: number]: { [key: string]: Category[] };
}

interface Child {
  id: number;
  name: string;
  age: string;
}

type AgeRange = '0-2months' | '2-4months' | '4-6months' | '6-9months' | '9-12months' | '12-15months' | '15-18months' | '18mo-2yrs' | '2yrs-2yrs6mon' | '2yrs6mon-3yrs' | '3yrs-4yrs' | '4yrs-5yrs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  totalMilestones = 0;
  totalAchieved = 0;
  selectedAge: AgeRange = '0-2months';
  filteredCategories: Category[] = [];
  selectedChildName: string = '';
  selectedChildAge: string = '';
  selectedChildId: number | null = null;
  totalSometimes = 0;

  children: Child[] = [
    { id: 1, name: 'Child 1', age: '2 months' },
    { id: 2, name: 'Child 2', age: '4 months' },
    { id: 3, name: 'Child 3', age: '6 months' }
  ];

  staticMilestones: { [key: string]: Category[] } = {
    '0-2months': [
      {
        id: 1,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Begins to smile at people', status: 'not-yet' },
          { description: 'Can briefly calm themselves (may bring hands to mouth)', status: 'not-yet' }
        ]
      },
      {
        id: 13,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Makes sounds like cooing', status: 'not-yet' }
        ]
      },
      {
        id: 14,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Pays attention to faces', status: 'not-yet' }
        ]
      },
      {
        id: 15,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Can lift head when lying on stomach', status: 'not-yet' }
        ]
      }
    ],
    '2-4months': [
      {
        id: 2,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Smiles spontaneously', status: 'not-yet' },
          { description: 'Can hold a toy and shake it', status: 'not-yet' },
          { description: 'Cries differently for different needs', status: 'not-yet' }
        ]
      },
      {
        id: 16,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Babbling begins', status: 'not-yet' }
        ]
      },
      {
        id: 17,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Looks at hand', status: 'not-yet' }
        ]
      },
      {
        id: 18,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Pushes down on legs when feet are placed on a hard surface', status: 'not-yet' }
        ]
      }
    ],
    '4-6months': [
      {
        id: 3,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Follows moving things with eyes from side to side', status: 'not-yet' },
          { description: 'Knows familiar faces and begins to know if someone is a stranger', status: 'not-yet' }
        ]
      },
      {
        id: 19,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Makes many different kinds of sounds like "mamama" and "bababa"', status: 'not-yet' }
        ]
      },
      {
        id: 20,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Reaches for toy with one hand', status: 'not-yet' }
        ]
      },
      {
        id: 21,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Can hold a toy and shake it', status: 'not-yet' }
        ]
      }
    ],
    '6-9months': [
      {
        id: 4,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Has favorite things and people', status: 'not-yet' },
          { description: 'Shows fear in some situations', status: 'not-yet' }
        ]
      },
      {
        id: 22,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Understands “no”', status: 'not-yet' }
        ]
      },
      {
        id: 23,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Looks around at things nearby', status: 'not-yet' }
        ]
      },
      {
        id: 24,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Can pass a toy from one hand to the other', status: 'not-yet' }
        ]
      }
    ],
    '9-12months': [
      {
        id: 5,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Cries when mom or dad leaves', status: 'not-yet' },
          { description: 'Has favorite things and people', status: 'not-yet' }
        ]
      },
      {
        id: 25,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Says “dada” and “mama” and exclamations like “uh-oh!”', status: 'not-yet' }
        ]
      },
      {
        id: 26,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Explores things in different ways, like shaking, banging, throwing', status: 'not-yet' }
        ]
      },
      {
        id: 27,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Pulls up to stand, walks holding on to furniture', status: 'not-yet' }
        ]
      }
    ],
    '12-15months': [
      {
        id: 6,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Shows fear in some situations', status: 'not-yet' },
          { description: 'Hands you a toy when asked', status: 'not-yet' }
        ]
      },
      {
        id: 28,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Follows simple directions like “pick up the toy”', status: 'not-yet' }
        ]
      },
      {
        id: 29,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Explores things in different ways', status: 'not-yet' }
        ]
      },
      {
        id: 30,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Stands, holding on, and can get into sitting position', status: 'not-yet' }
        ]
      }
    ],
    '15-18months': [
      {
        id: 7,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Shows fear in some situations', status: 'not-yet' },
          { description: 'Has favorite things and people', status: 'not-yet' }
        ]
      },
      {
        id: 31,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Says several single words', status: 'not-yet' }
        ]
      },
      {
        id: 32,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Can follow one-step commands without any gestures', status: 'not-yet' }
        ]
      },
      {
        id: 33,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Walks alone or while holding onto furniture', status: 'not-yet' }
        ]
      }
    ],
    '18mo-2yrs': [
      {
        id: 8,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Shows fear in some situations', status: 'not-yet' },
          { description: 'Hands you a toy when asked', status: 'not-yet' }
        ]
      },
      {
        id: 34,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Knows what ordinary things are for; for example, telephone, brush, spoon', status: 'not-yet' }
        ]
      },
      {
        id: 35,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Begins to sort shapes and colors', status: 'not-yet' }
        ]
      },
      {
        id: 36,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Climbs onto and down from furniture without help', status: 'not-yet' }
        ]
      }
    ],
    '2yrs-2yrs6mon': [
      {
        id: 9,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Knows what ordinary things are for', status: 'not-yet' },
          { description: 'Copies others, especially adults and older children', status: 'not-yet' }
        ]
      },
      {
        id: 37,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Points to things or pictures when they are named', status: 'not-yet' }
        ]
      },
      {
        id: 38,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Can play make-believe with dolls, animals, and people', status: 'not-yet' }
        ]
      },
      {
        id: 39,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Stands on tiptoe', status: 'not-yet' }
        ]
      }
    ],
    '2yrs6mon-3yrs': [
      {
        id: 10,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Shows fear in some situations', status: 'not-yet' },
          { description: 'Hands you a toy when asked', status: 'not-yet' }
        ]
      },
      {
        id: 40,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Knows the idea of “mine” and “yours”', status: 'not-yet' }
        ]
      },
      {
        id: 41,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Can work toys with buttons, levers, and moving parts', status: 'not-yet' }
        ]
      },
      {
        id: 42,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Kicks a ball', status: 'not-yet' }
        ]
      }
    ],
    '3yrs-4yrs': [
      {
        id: 11,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Prefers to play with other children than by themselves', status: 'not-yet' },
          { description: 'Follows instructions with 2 or 3 steps', status: 'not-yet' }
        ]
      },
      {
        id: 43,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Can say first name, age, and sex', status: 'not-yet' }
        ]
      },
      {
        id: 44,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Can work toys with buttons, levers, and moving parts', status: 'not-yet' }
        ]
      },
      {
        id: 45,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Can pedal a tricycle (3-wheel bike)', status: 'not-yet' }
        ]
      }
    ],
    '4yrs-5yrs': [
      {
        id: 12,
        name: 'Social/Emotional Milestones',
        milestones: [
          { description: 'Can say first name, last name, and age', status: 'not-yet' },
          { description: 'Can count 10 or more things', status: 'not-yet' }
        ]
      },
      {
        id: 46,
        name: 'Language/Communication Milestones',
        milestones: [
          { description: 'Can say the first and last name', status: 'not-yet' }
        ]
      },
      {
        id: 47,
        name: 'Cognitive Milestones',
        milestones: [
          { description: 'Can work toys with buttons, levers, and moving parts', status: 'not-yet' }
        ]
      },
      {
        id: 48,
        name: 'Movement/Physical Development Milestones',
        milestones: [
          { description: 'Can hop and stand on one foot up to 5 seconds', status: 'not-yet' }
        ]
      }
    ]
  };
  
  categories: Categories = {};

  ageOptions: { value: AgeRange, label: string }[] = [];

  constructor(private modalController: ModalController) {
    this.initializeCategories();
    this.initializeAgeOptions();
  }

  initializeCategories() {
    this.children.forEach(child => {
      // Create a deep copy of the static milestones for each child
      this.categories[child.id] = JSON.parse(JSON.stringify(this.staticMilestones));
    });
  }

  initializeAgeOptions() {
    if (this.selectedChildId !== null) {
      const availableRanges = Object.keys(this.categories[this.selectedChildId]) as AgeRange[];
      this.ageOptions = availableRanges.map(range => ({
        value: range,
        label: this.getAgeLabel(range)
      }));
    }
  }

  openChildModal(event: any) {
    this.selectedChildId = event.detail.value;
    const selectedChild = this.children.find(child => child.id === this.selectedChildId);
    if (selectedChild) {
      this.selectedChildName = selectedChild.name;
      this.selectedChildAge = selectedChild.age;

      this.selectedAge = this.convertAgeToRange(selectedChild.age);
      this.updateAgeOptions();
      this.filterMilestonesByAge();
    } else {
      this.resetSelection();
    }
  }

  convertAgeToRange(age: string): AgeRange {
    if (age.includes('month')) {
      const months = parseInt(age.split(' ')[0], 10);
      if (months <= 2) return '0-2months';
      if (months <= 4) return '2-4months';
      if (months <= 6) return '4-6months';
      if (months <= 9) return '6-9months';
      if (months <= 12) return '9-12months';
      if (months <= 15) return '12-15months';
      if (months <= 18) return '15-18months';
      if (months <= 24) return '18mo-2yrs';
      if (months <= 30) return '2yrs-2yrs6mon';
      if (months <= 36) return '2yrs6mon-3yrs';
      if (months <= 48) return '3yrs-4yrs';
      return '4yrs-5yrs';
    }
    return '0-2months'; // Default if age format is unexpected
  }
  
  updateAgeOptions() {
    if (this.selectedChildId !== null) {
      const availableRanges = Object.keys(this.categories[this.selectedChildId]) as AgeRange[];
      this.ageOptions = availableRanges.map(range => ({
        value: range,
        label: this.getAgeLabel(range)
      }));
    }
  }

  getAgeLabel(range: AgeRange): string {
    switch (range) {
      case '0-2months': return '0-2 Months';
      case '2-4months': return '2-4 Months';
      case '4-6months': return '4-6 Months';
      case '6-9months': return '6-9 Months';
      case '9-12months': return '9-12 Months';
      case '12-15months': return '12-15 Months';
      case '15-18months': return '15-18 Months';
      case '18mo-2yrs': return '18mon -2 years';
      case '2yrs-2yrs6mon': return '2yrs-2yrs 6mon';
      case '2yrs6mon-3yrs': return '2yrs 6mon - 3 years';
      case '3yrs-4yrs': return '3 years - 4 years';
      case '4yrs-5yrs': return '4 years - 5 years';
      default: return '';
    }
  }

  filterMilestonesByAge() {
    if (this.selectedChildId !== null) {
      const selectedCategories = this.categories[this.selectedChildId][this.selectedAge] || [];
      this.filteredCategories = selectedCategories;

      this.totalMilestones = this.filteredCategories.reduce((sum, category) => sum + category.milestones.length, 0);
      this.totalAchieved = this.filteredCategories.reduce((sum, category) => sum + category.milestones.filter(milestone => milestone.status === 'frequently' || milestone.status === 'sometimes').length, 0);
      this.totalSometimes = this.filteredCategories.reduce((sum, category) => sum + category.milestones.filter(milestone => milestone.status === 'sometimes').length, 0);
    }
  }

  updateMilestoneStatus(categoryIndex: number, milestoneIndex: number, status: any) {
    if (this.selectedChildId !== null) {
      const validStatus = String(status) || 'not-yet';
      this.categories[this.selectedChildId][this.selectedAge][categoryIndex].milestones[milestoneIndex].status = validStatus;
      this.calculateAchievements();
    }
  }

  calculateAchievements() {
    if (this.selectedChildId !== null) {
      this.filteredCategories.forEach(category => {
        category.total = category.milestones.length;
        category.achieved = category.milestones.filter(milestone => milestone.status === 'frequently' || milestone.status === 'sometimes').length;
      });

      this.totalAchieved = this.filteredCategories.reduce((sum, category) => sum + (category.achieved ?? 0), 0);
      this.totalSometimes = this.filteredCategories.reduce((sum, category) => sum + (category.milestones.filter(milestone => milestone.status === 'sometimes').length ?? 0), 0);
    }
  }

  resetSelection() {
    this.selectedChildName = '';
    this.selectedChildAge = '';
    this.selectedAge = '0-2months';
    this.filteredCategories = [];
    this.ageOptions = [];
  }
}

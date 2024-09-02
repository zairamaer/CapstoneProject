import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  totalAchieved = 100;
  totalMilestones = 200;
  dailyActiveUsers = 150;

  logsPerCategory = {
    socEmo: 35,
    language: 50,
    cognitive: 40,
    movement: 25,
  };

  trendsMilestoneTracking = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    milestonesCompleted: [10, 15, 20, 30, 40, 50],
    socEmoCompleted: [5, 7, 10, 15, 20, 25],
    languageCompleted: [8, 12, 16, 22, 28, 35],
    cognitiveCompleted: [3, 4, 6, 8, 12, 15],
    movementCompleted: [2, 3, 4, 5, 8, 10],
  };

  topMilestones = [
    { milestone: 'Smiles at people', logs: 80 },
    { milestone: 'Coos or babbles', logs: 60 },
    { milestone: 'Turns towards sound', logs: 50 },
  ];

  userAgeGroups = '18-24, 25-34, 35-44';
  userRegions = 'North America, Europe, Asia';

  constructor() {}

  ngOnInit() {
    this.createCategoryInteractionChart();
    this.createTrendsMilestoneTrackingChart();
    this.createTopMilestonesChart();
  }

  createCategoryInteractionChart() {
    new Chart('categoryInteractionChart', {
      type: 'bar',
      data: {
        labels: ['SOC/EMO', 'Language', 'Cognitive', 'Movement'],
        datasets: [
          {
            data: [
              this.logsPerCategory.socEmo,
              this.logsPerCategory.language,
              this.logsPerCategory.cognitive,
              this.logsPerCategory.movement,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        indexAxis: 'y',
      },
    });
  }

  createTrendsMilestoneTrackingChart() {
    new Chart('trendsMilestoneTrackingChart', {
      type: 'line',
      data: {
        labels: this.trendsMilestoneTracking.dates,
        datasets: [
          {
            label: 'SOC/EMO',
            data: this.trendsMilestoneTracking.socEmoCompleted,
            borderColor: '#FF6384',
            fill: false,
          },
          {
            label: 'Language',
            data: this.trendsMilestoneTracking.languageCompleted,
            borderColor: '#36A2EB',
            fill: false,
          },
          {
            label: 'Cognitive',
            data: this.trendsMilestoneTracking.cognitiveCompleted,
            borderColor: '#FFCE56',
            fill: false,
          },
          {
            label: 'Movement',
            data: this.trendsMilestoneTracking.movementCompleted,
            borderColor: '#4BC0C0',
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        },
        responsive: true,
      },
    });
  }

  createTopMilestonesChart() {
    new Chart('topMilestonesChart', {
      type: 'doughnut',
      data: {
        labels: this.topMilestones.map(m => m.milestone),
        datasets: [
          {
            data: this.topMilestones.map(m => m.logs),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        },
        responsive: true,
      },
    });
  }
}

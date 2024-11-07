import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  videoReferences: { title: string; youtube_link: string }[] = [];
  milestonesByAges: { month: string; link: string, link_label: string, description: string, icon: string }[] = [];
  loading: boolean = true; // Loading state variable
  openMilestones: { [key: string]: boolean } = {};

  constructor(private navCtrl: NavController, private authService: AuthService,  private sanitizer: DomSanitizer ) {}

  ngOnInit() {
    this.loadVideoReferences();
    this.loadMilestonesByAge();
  }

  loadMilestonesByAge() {
    this.authService.getMilestonesByAge().subscribe(
      (response) => {
        this.loading = false; // Set loading to false after the request completes
        if (response && response.status === 'success') {
          this.milestonesByAges = response.data; // Populate videoReferences with API response
        } else {
          console.error('Failed to fetch milestones by ages', response);
        }
      },
      (error) => {
        this.loading = false; // Set loading to false on error
        console.error('Error fetching milestones by ages', error);
      }
    );
  }

  loadVideoReferences() {
    this.authService.getVideoReferences().subscribe(
      (response) => {
        this.loading = false; // Set loading to false after the request completes
        if (response && response.status === 'success') {
          this.videoReferences = response.data; // Populate videoReferences with API response
        } else {
          console.error('Failed to fetch video references', response);
        }
      },
      (error) => {
        this.loading = false; // Set loading to false on error
        console.error('Error fetching video references', error);
      }
    );
  }

   // Pipe to safely bind URLs for iframe
   safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

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

  getEmbedUrl(url: string): string {
    // Extract the video ID from the URL and return the embed URL
    const videoId = url.split('v=')[1]?.split('&')[0]; // Extract the video ID
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }
}

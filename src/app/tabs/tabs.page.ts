import { Component } from '@angular/core';

import { addIcons } from 'ionicons';
import { playCircle, radio, search, home, basketball, trophy, chatbox, accessibility} from 'ionicons/icons'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {

    addIcons({ playCircle, radio, search, home, basketball, trophy, chatbox, accessibility});

  }

}

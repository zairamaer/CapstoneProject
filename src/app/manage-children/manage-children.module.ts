import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageChildrenPageRoutingModule } from './manage-children-routing.module';

import { ManageChildrenPage } from './manage-children.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageChildrenPageRoutingModule
  ],
  declarations: [ManageChildrenPage]
})
export class ManageChildrenPageModule {}

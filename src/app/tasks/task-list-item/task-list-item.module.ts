import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskListItemPageRoutingModule } from './task-list-item-routing.module';

import { TaskListItemPage } from './task-list-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskListItemPageRoutingModule
  ],
  declarations: [TaskListItemPage]
})
export class TaskListItemPageModule {}

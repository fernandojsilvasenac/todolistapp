import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListItemPage } from './task-list-item.page';

const routes: Routes = [
  {
    path: '',
    component: TaskListItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskListItemPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'tasks/list',
    loadChildren: './tasks/task-list/task-list.module#TaskListPageModule'
  },
  {
    path: 'task-list-item',
    loadChildren: () => import('./tasks/task-list-item/task-list-item.module').then( m => m.TaskListItemPageModule)
  },
  {
    path: 'tasks/new',
    loadChildren: './tasks/task-form/task-form.module#TaskFormPageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

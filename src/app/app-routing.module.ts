import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'task-list',
    loadChildren: './tasks/task-list/task-list.module#TaskListPageModule'
  },
  {
    path: 'task-list-item',
    loadChildren: () => import('./tasks/task-list-item/task-list-item.module').then( m => m.TaskListItemPageModule)
  },
  {
    path: 'task-form',
    loadChildren: () => import('./tasks/task-form/task-form.module').then( m => m.TaskFormPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

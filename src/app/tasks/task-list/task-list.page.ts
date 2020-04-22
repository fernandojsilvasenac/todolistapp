import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from '../shared/tasks.service';
import { Tasks } from '../shared/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: Observable<Tasks[]>;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    // esse execução é somente para vermos o retorno da consulta no console.log
    this.tasksService.getAll().subscribe( (data: any) => {
      console.log(data);
    });
    // essa é a execução que retorna a consulta para um observable e mostra na page
    this.tasks = this.tasksService.getAll();
  }


  delete(task: Tasks){
    this.tasksService.remove(task.id);
  }

  onCompletedCheckChange(task: Tasks) {
    this.tasksService.update(task.id, task);
  }


}

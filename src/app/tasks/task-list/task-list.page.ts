import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TasksService } from '../shared/tasks.service';
import { Tasks } from '../shared/tasks';
import { reduce, filter } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: Observable<Tasks[]>;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    // debugger;
    // const observable$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // observable$.pipe(
    //   filter(x => x % 2 == 0),
    //   reduce( (acumulador, valor, index) => {
    //         console.log(acumulador);
    //         console.log(valor);
    //         console.log(index);
    //   return acumulador + valor;
    //   })


    // ).subscribe(x => console.log(x));

    // esse execução é somente para vermos o retorno da consulta no console.log
    this.tasksService.getAll().subscribe( (data: any) => {
      console.log(data);
    });
    // essa é a execução que retorna a consulta para um observable e mostra na page
    this.tasks = this.tasksService.getAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from './../shared/tasks.service';
import { ToastController } from '@ionic/angular';
import { Tasks } from '../shared/tasks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {
  title: string;
  id: string;
  formtasks: FormGroup;
  tasks: Observable<Tasks[]>;
  // public tasks: Tasks = {};

  constructor( private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activateRoute: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router ) { }

  ngOnInit() {
    this.title = 'Adicionar Tarefas';
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Alterando Tarefa';
      const subscribe = this.tasksService.getById(this.id).subscribe( (tasks: any) => {
        subscribe.unsubscribe();
        this.tasks = tasks;
        this.formtasks.setValue({
          description: tasks.description,
          datetasks: tasks.datetasks != null ? tasks.datetasks : '',
          completed: tasks.completed
        });
      });
    }
    this.createForm();

  }  

  createForm() {
    this.formtasks = this.formBuilder.group({
      description: ['', Validators.required],
      completed: [false],
      datetasks: [''],
    });
  }

  // alias para os controles/inputs do form
  get f() { return this.formtasks.controls; }
  
  get description() { return this.formtasks.get('description'); }
  get completed() { return this.formtasks.get('completed'); }
  get datetasks() { return this.formtasks.get('datetasks'); }
   

  async show(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async onSubmit() {
    console.log(this.formtasks.value);
    if (this.formtasks.valid) {
      if (this.id) {
        try{
          await this.tasksService.update(this.id, this.formtasks.value);
          this.show('Tarefa salvo com sucesso');

        } catch (error) {
          this.show('Erro ao tentar Alterar')
        }
      } else {
          try {
            await this.tasksService.insert(this.formtasks.value);
            this.show('Tarefa salva com sucesso !!!');
            this.router.navigate(['/tasks/list']);

          } catch (error) {
            console.log(error);
            this.show('Erro ao tentar Salvar');
            // this.toastr.error('Erro ao tentar Salvar')
          }
        }    

    } else {
      this.show('Campo precisa ser preenchido');
    }

  }
}

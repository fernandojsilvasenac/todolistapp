import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from './../shared/tasks.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {
  
  formtasks: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private toastController: ToastController,
    private tasksService: TasksService,
    private router: Router ) { }

  ngOnInit() {
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
      try {
        await this.tasksService.insert(this.formtasks.value);
        this.show('Tarefa salva com sucesso !!!');
        // this.createForm();
        this.router.navigate(['/tasks/list']);

      } catch (error) {
        console.log(error);
        this.show('Erro ao tentar Salvar');
        // this.toastr.error('Erro ao tentar Salvar')
      }

    } else {
      this.show('Campo precisa ser preenchido');
    }

  }
}

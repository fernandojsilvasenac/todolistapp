import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.criarFormulario();
  }

  criarFormulario() {
    this.formtasks = this.formBuilder.group({
      description: ['', Validators.required],
      completed: [false],
    });
  }

  async show(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async onSubmit() {
    if (this.formtasks.valid) {
      console.log(this.formtasks.value);
      try {
        await this.tasksService.insert(this.formtasks.value);
        this.show('Tarefa salva com sucesso !!!');
        this.criarFormulario();
        this.router.navigate(['/tasks/list']);

      } catch (error) {
        console.log(error);
        this.show('Erro ao tentar Salvar');
        // this.toastr.error('Erro ao tentar Salvar')
      }

    }

  }
}

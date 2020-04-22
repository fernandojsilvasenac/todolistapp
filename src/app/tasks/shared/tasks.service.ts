import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Tasks } from './tasks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // Representação da nossa Collection tasks do Firestore
  private tasksCollection: AngularFirestoreCollection<Tasks>;
  // objeto Observable
  tasks: Observable<Tasks[]>;
              // Representação do nossa conexão com o Banco Firestore
  constructor(private afs: AngularFirestore) { 
    // Recebendo a nossa collection tasks do Banco Firestore
    this.tasksCollection = this.afs.collection<Tasks>('tasks');
  }

  // insert document in the tasks collection
  insert(tasks: Tasks){
    return this.tasksCollection.add(tasks);
  }

  // update document in the tasks collection
  update(id: string, tasks: Tasks){
    return this.tasksCollection.doc<Tasks>(id).update(tasks);
  }

  // delete document in task collection using id as reference
  remove(id: string) {
    this.tasksCollection.doc<Tasks>(id).delete();
  }  

  // search document in tasks collection by id
  getById(id: string) {
    return this.tasksCollection.doc<Tasks>(id).valueChanges();
  }

  // getAll(){
  //   return this.afs.collection('tasks', ref => ref.orderBy('description','desc')).valueChanges();
  // }  

  getAll() {
    return this.afs.collection('tasks', ref => ref.orderBy('description','asc'))
    .snapshotChanges().pipe(
      map(changes => {
        return changes.map(c =>  ({
          id: c.payload.doc.id, ...c.payload.doc.data() as Tasks
        }))
      })
    );
  }

  // Modelo de Consulta snapshotChanges do Firestore
  // Documentação: https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md#snapshotchanges
  // getAll() {
  //   return this.tasksCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data();
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }

  // getAll() {
  //   return this.afs.collection('tasks', ref => ref.orderBy('description','asc')).snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Tasks;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }



}
// documentação angularfire
// https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
// documentação firestore/segurança
// https://firebase.google.com/docs/rules/basics?authuser=0
// Firebase RTD
// https://www.youtube.com/watch?v=8FDwTjgLN48


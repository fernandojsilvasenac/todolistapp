import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskFormPage } from './task-form.page';

describe('TaskFormPage', () => {
  let component: TaskFormPage;
  let fixture: ComponentFixture<TaskFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

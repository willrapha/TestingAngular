import { HttpModule } from '@angular/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

xdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should load todos from the server', () => {
    let service = TestBed.get(TodoService); // ou fixture.debugElement.injector.get(TodoService);
    
    spyOn(service, 'getTodos').and.returnValue(Observable.from([ [1, 2, 3] ]));
    
    fixture.detectChanges();

    expect(component.todos.length).toBe(3);
  });

  it('should load todos promisse from the server', fakeAsync(() => {
    let service = TestBed.get(TodoService);

    spyOn(service, 'getTodosPromisse').and.returnValue(Promise.resolve([1, 2, 3]));
    
    fixture.detectChanges();
    
    tick(); // simula passagem do tempo para operações assincronas
    expect(component.todos.length).toBe(3);

    // No caso de utilizamos o async em vez do fakeAsync
    // aguarda metodo getTodosPromisse finalizar sua busca so apos isso realiza a expectativa
    /* fixture.whenStable().then(() => {
      expect(component.todos.length).toBe(3);
    }) */

  }));

});

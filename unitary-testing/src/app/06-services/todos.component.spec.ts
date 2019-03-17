import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1, 2, 3];

    // fake do metodo 'getTodos' dentro de 'service'
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([ todos ]) // returno fake do metodo - simples
      // ou
      /* return Observable.from([ [ 
            {id: 1, title: 'a'},
            {id: 2, title: 'b'},
            {id: 3, title: 'c'}
          ] ]) */ 
    });

    component.ngOnInit();
    // toBeGreaterThan - ser maior que
    expect(component.todos.length).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty(); // retorno vazio
    });

    component.add();
    
    // toHaveBeenCalled - ter sido chamado
    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id : 1 };

    // em vez de criarmos uma chamada fake 'callFake' podemos utilizar o 'returnValue'
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([ { todo } ]));

    component.add();

    // toBeGreaterThan - ser maior que
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error when adding  a new todo', () => {
    let error = 'error from the server'
    // em vez de criarmos uma chamada fake 'callFake' podemos utilizar o 'returnValue'
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error));

    component.add();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    // toHaveBeenCalledWith - tenha sido chamando com 
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    // toHaveBeenCalled - tenha sido chamando 
    expect(spy).not.toHaveBeenCalled();
  });

});
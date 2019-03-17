import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>; // ComponentFixture - obtem instancia, modelo e elementos DOM   

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });

    fixture = TestBed.createComponent(VoterComponent); // criamos o nosso componente
    component = fixture.componentInstance; // instanciamos o nosso componente
    
    // Elementos DOM
    // fixture.nativeElement; // O “nativeElement” aqui obtém o nó DOM para o componente 
    // fixture.debugElement; // obtem elementos de depuracao para o componente
  });

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges(); // verificar as mudancas que ocorreram nesse momento

    // query - primeiro elemento correspondente
    // queryAll - todos elementos correspondentes
    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement; 

    expect(el.innerText).toBe(21);
  });

  it('should hifhlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    // buscando elemento
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
      
    // classe do lemento
    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase total votes when i click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    // evento de click
    button.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  });
});

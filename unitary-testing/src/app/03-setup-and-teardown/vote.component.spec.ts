import { VoteComponent } from './vote.component';

describe('VoteComponent', () => { // O que estamos testando

  let component: VoteComponent;

  // Antes de cada teste é chamado essa função
  beforeEach(() => { // Set up
    component = new VoteComponent();
  });

  // Após de cada teste é chamado essa função
  afterEach(() => { // tear down

  });

  // Antes de todos os testes
  beforeAll(() => {

  });

  // Após todos os testes
  afterAll(() => {

  });

  it('should increment totalVotes when upvoted', () => { // Testes
    // Act - Agir
    component.upVote();

    // Assert - Afirmação
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downvotes', () => {
    // Act - Agir
    component.downVote();

    // Assert - Afirmação
    expect(component.totalVotes).toBe(-1);
  });

  it('', () => {
  });
});

import { compute } from "./compute";

// function () {} or () => {}

describe('compute', () => { // suite

  it('should return 0 if is negative', () => { // spec
    const result = compute(-1);
    expect(result).toBe(0);
  });

  it('should increment the input if it is positive', () => { // spec
    const result = compute(1);
    expect(result).toBe(2);
  });

});


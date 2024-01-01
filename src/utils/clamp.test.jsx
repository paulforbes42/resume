import clamp from './clamp';

describe('clamp math utility', () => {
  const min = 10;
  const max = 100;

  it('should allow values between the min and max', () => {
    expect(clamp(50, min, max)).toBe(50);
    expect(clamp(10, min, max)).toBe(10);
    expect(clamp(100, min, max)).toBe(100);
    expect(clamp(99, min, max)).toBe(99);
    expect(clamp(11.5, min, max)).toBe(11.5);
  });

  it('should normalize values below the min', () => {
    expect(clamp(1, min, max)).toBe(10);
    expect(clamp(-1, min, max)).toBe(10);
    expect(clamp(9, min, max)).toBe(10);
    expect(clamp(0.5, min, max)).toBe(10);
    expect(clamp(5, min, max)).toBe(10);
  });

  it('should normalize values above the max', () => {
    expect(clamp(1000, min, max)).toBe(100);
    expect(clamp(100.7, min, max)).toBe(100);
    expect(clamp(999, min, max)).toBe(100);
  });
});

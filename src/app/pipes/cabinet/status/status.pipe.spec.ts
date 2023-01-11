import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  const pipe = new StatusPipe();

  it('transforms the first character to uppercase', () => {
    expect(pipe.transform('everything')).toBe('Everything');
  });
});

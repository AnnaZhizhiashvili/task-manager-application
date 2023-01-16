import { BadgeNamePipe } from './badge-name.pipe';

describe('BadgeNamePipe', () => {
  it('create an instance', () => {
    const pipe = new BadgeNamePipe();
    expect(pipe).toBeTruthy();
  });
});

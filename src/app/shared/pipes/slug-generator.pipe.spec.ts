import { SlugGeneratorPipe } from './slug-generator.pipe';

describe('SlugGeneratorPipe', () => {
  it('create an instance', () => {
    const pipe = new SlugGeneratorPipe();
    expect(pipe).toBeTruthy();
  });
});

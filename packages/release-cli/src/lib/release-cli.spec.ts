import { releaseCli } from './release-cli';

describe('releaseCli', () => {
  it('should work', () => {
    expect(releaseCli()).toEqual('release-cli');
  });
});

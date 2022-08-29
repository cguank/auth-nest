import { Test, TestingModule } from '@nestjs/testing';
import { deprecate } from 'util';
import { encrypte,validate} from './encryption'

describe('en', () => {

  describe('en', () => {
    it('should return "Hello World!"', async () => {
      const encryptedText = encrypte('nest')
      console.log('......',validate('nest',encryptedText));
      
      expect(encryptedText).toBe('aer5Fg==');
    });
  });
});

import { FimsValidators } from './validators';
import { FormControl, FormGroup } from '@angular/forms';
import { dateAsISOString } from '../../services/domain/date.converter';

describe('Validators', () => {
  describe('urlSafe', () => {
    it('should not return error when url safe', () => {
      const result = FimsValidators.urlSafe(new FormControl('test-test'));
      expect(result).toBeNull();
    });

    it('should return error when not url safe', () => {
      const result = FimsValidators.urlSafe(new FormControl(' '));
      expect(result).toEqual({ urlSafe: true });
    });

    const notAllowed: string[] = ['!', `'`, '(', ')', '~'];

    notAllowed.forEach(char => {
      it(`should return error when when it contains ${char}`, () => {
        const result = FimsValidators.urlSafe(new FormControl(`${char}`));
        expect(result).toEqual({ urlSafe: true });
      });
    });
  });

  describe('scale', () => {
    it('should not return error when scale matches', () => {
      const validator = FimsValidators.scale(1);
      expect(validator(new FormControl(1.1))).toBeNull();
    });

    it('should return error when scale 1', () => {
      const validator = FimsValidators.scale(1);
      expect(validator(new FormControl(1))).toEqual({
        scale: {
          valid: false,
          value: 1,
        },
      });
    });

    it('should return error when scale 0', () => {
      const validator = FimsValidators.scale(0);
      expect(validator(new FormControl(1.2))).toEqual({
        scale: {
          valid: false,
          value: 0,
        },
      });
    });
  });

  describe('minValue with 0', () => {
    it('should not return error when value 0', () => {
      const validator = FimsValidators.minValue(0);
      expect(validator(new FormControl(0))).toBeNull();
    });

    it('should return error when value -1', () => {
      const validator = FimsValidators.minValue(0);
      expect(validator(new FormControl(-1))).toEqual({
        minValue: {
          valid: false,
          value: 0,
        },
      });
    });
  });

  describe('maxValue with 10', () => {
    it('should not return error when value 10', () => {
      const validator = FimsValidators.maxValue(10);
      expect(validator(new FormControl(10))).toBeNull();
    });

    it('should return error when value 11', () => {
      const validator = FimsValidators.maxValue(10);
      expect(validator(new FormControl(11))).toEqual({
        maxValue: {
          valid: false,
          value: 10,
        },
      });
    });
  });

  describe('greaterThanValue with 0', () => {
    it('should not return error when value 1', () => {
      const validator = FimsValidators.greaterThanValue(0);
      expect(validator(new FormControl(1))).toBeNull();
    });

    it('should return error when value 0', () => {
      const validator = FimsValidators.greaterThanValue(0);
      expect(validator(new FormControl(0))).toEqual({
        greaterThanValue: {
          valid: false,
          value: 0,
        },
      });
    });

    it('should return error when value -1', () => {
      const validator = FimsValidators.greaterThanValue(0);
      expect(validator(new FormControl(-1))).toEqual({
        greaterThanValue: {
          valid: false,
          value: 0,
        },
      });
    });
  });

  describe('matchRange', () => {
    const dateOne = new Date();
    const dateTwo = new Date(dateOne.getTime() + 1000);

    it('should not return error when range is correct', () => {
      const group = new FormGroup({ f1: new FormControl(dateOne.toISOString()), f2: new FormControl(dateTwo.toISOString()) });
      const validator = FimsValidators.matchRange('f1', 'f2');
      expect(validator(group)).toBeNull();
    });

    it('should return error when range not correct', () => {
      const group = new FormGroup({ f1: new FormControl(dateOne.toISOString()), f2: new FormControl(dateTwo.toISOString()) });
      const validator = FimsValidators.matchRange('f2', 'f1');
      expect(validator(group)).toEqual({
        rangeInvalid: true,
      });
    });
  });

  describe('email', () => {
    it('should return null when email is correct', () => {
      const result = FimsValidators.email(new FormControl('test@test.de'));
      expect(result).toBeNull();
    });

    it(`should return error when email is 'testtest.de'`, () => {
      const result = FimsValidators.email(new FormControl('testtest.de'));
      expect(result).toEqual({
        email: true,
      });
    });
  });

  describe('requiredNotEmpty', () => {
    it('should return null when value exists', () => {
      const result = FimsValidators.requiredNotEmpty(new FormControl('value'));
      expect(result).toBeNull();
    });

    it('should return error when no value exists', () => {
      const result = FimsValidators.requiredNotEmpty(new FormControl(''));
      expect(result).toEqual({
        required: true,
      });
    });

    it('should return error when value with only whitespaces exists', () => {
      const result = FimsValidators.requiredNotEmpty(new FormControl(' '));
      expect(result).toEqual({
        required: true,
      });
    });
  });

  describe('greaterThan', () => {
    it('should return null when min < max', () => {
      const validator = FimsValidators.greaterThan('min', 'max');
      const group = new FormGroup({
        min: new FormControl(1),
        max: new FormControl(2),
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return error when min = max', () => {
      const validator = FimsValidators.greaterThan('min', 'max');
      const group = new FormGroup({
        min: new FormControl(2),
        max: new FormControl(2),
      });

      const result = validator(group);

      expect(result).toEqual({
        greaterThan: true,
      });
    });

    it('should return error when min > max', () => {
      const validator = FimsValidators.greaterThan('min', 'max');
      const group = new FormGroup({
        min: new FormControl(2),
        max: new FormControl(1),
      });

      const result = validator(group);

      expect(result).toEqual({
        greaterThan: true,
      });
    });
  });

  describe('greaterThanEquals', () => {
    it('should return null when min < max', () => {
      const validator = FimsValidators.greaterThanEquals('min', 'max');
      const group = new FormGroup({
        min: new FormControl(1),
        max: new FormControl(2),
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null when min = max', () => {
      const validator = FimsValidators.greaterThanEquals('min', 'max');
      const group = new FormGroup({
        min: new FormControl(2),
        max: new FormControl(2),
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return error when min > max', () => {
      const validator = FimsValidators.greaterThanEquals('min', 'max');
      const group = new FormGroup({
        min: new FormControl(2),
        max: new FormControl(1),
      });

      const result = validator(group);

      expect(result).toEqual({
        greaterThanEquals: true,
      });
    });
  });

  describe('beforeToday', () => {
    it('should return null when date before today', () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const result = FimsValidators.beforeToday(new FormControl(dateAsISOString(date)));

      expect(result).toBeNull();
    });

    it('should return error when date after today', () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);

      const result = FimsValidators.beforeToday(new FormControl(dateAsISOString(date)));

      expect(result).toEqual({
        beforeToday: true,
      });
    });

    it('should return error when date equals today', () => {
      const date = new Date();

      const result = FimsValidators.beforeToday(new FormControl(dateAsISOString(date)));

      expect(result).toEqual({
        beforeToday: true,
      });
    });
  });
});

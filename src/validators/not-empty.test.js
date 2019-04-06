import notEmpty from './not-empty';

it.each([
    // Not empty
    ['0', true],
    [0, true],
    [0.0, true],
    ['false', true],

    // Empty
    [' ', true],
    [undefined, false],
    ['', false],
    [null, false],
    [false, false],
  ])('returns whether %s is not empty - should be %s', (value, isValid) => {
    var expected = isValid ? undefined : [{
      "id": "empty",
      "message": "This field is required"
    }];
    let validator = notEmpty({
      "id": "empty",
      "message": "This field is required"
    });
    expect(validator(value)).toEqual(expected);
  });
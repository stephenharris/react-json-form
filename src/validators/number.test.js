import numberValidator from './number';

it.each([
    // Valid numbers
    [1, true],
    [1.0, true],
    ['2', true],
    [-2, true],
    ['1', true],
    ['1.0', true],
    [1.1, true],

    // Invalid numbers
    ['zero', false],
    ['', false],
    [null, false],
    [false, false],
    [undefined, false],
  ])('returns whether %s is a valid number - should be %s', (number, isValid) => {

    var expected = isValid ? undefined : [{
      "id": "invalidnumber",
      "message": "Please enter a number"
    }];

    var validator = numberValidator({
      "id": "invalidnumber",
      "message": "Please enter a number"
    });
    
    expect(validator(number)).toEqual(expected);
  });

  it.each([
    // Valid numbers
    [3, true],
    [9, true],
    [3.0, true],
    [9.0, true],
    ["3", true],
    ["9", true],
    [5, true],
    
    // Invalid numbers
    [2, false],
    [2.9999, false],
    [9.0001, false],
    ["not a number", false],
    [undefined, false],
  ])('returns whether %s is a valid number between 3 and 9 - should be %s', (number, isValid) => {

    var expected = isValid ? undefined : [{
      "id": "invalidnumber",
      "message": "Please enter a number between 3 and 9"
    }];

    var validator = numberValidator({
      "id": "invalidnumber",
      "message": "Please enter a number between 3 and 9",
      "min": 3,
      "max": 9
    });
    
    expect(validator(number)).toEqual(expected);
  });
import conditionsCheck from './conditions-check';

var object = {
  "foo": "bar",
  "baz": "qux",
  "quux": "corge",
  "uier": 1,
  "grault": 2
}

it('simple equality check', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "foo",
        "value": "bar",
        "operator": "="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});


it('multiple equality check', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "foo",
        "value": "bar",
        "operator": "="
      }, 
      {
        "target": "baz",
        "value": "qux",
        "operator": "="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});


it('multiple equality check with any, one fails', () => {
  var show = conditionsCheck({
    'gate': 'any',
    'conditions': [
      {
        "target": "foo",
        "value": "bar",
        "operator": "="
      }, 
      {
        "target": "baz",
        "value": "notequaltotarget",
        "operator": "="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});

it('multiple equality check with all, one fails', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "foo",
        "value": "bar",
        "operator": "="
      }, 
      {
        "target": "baz",
        "value": "notequaltotarget",
        "operator": "="
      }
    ]
  }, object);

  expect(show).toEqual(false);
});

it('simple inequality check', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "foo",
        "value": "notequals",
        "operator": "!="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});

it('simple mixed checks', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "foo",
        "value": "notequals",
        "operator": "!="
      },
      {
        "target": "baz",
        "value": "qux",
        "operator": "="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});


it('simple less than / equal (boundary)', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 2,
        "operator": "<="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});

it('simple less than / equal, ', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 1,
        "operator": "<="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});


it('simple strictly less than, ', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 1,
        "operator": "<"
      }
    ]
  }, object);

  expect(show).toEqual(true);
});


it('simple strictly less than, boundary', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 2,
        "operator": "<"
      }
    ]
  }, object);

  expect(show).toEqual(false);
});


it('simple less than / equal (boundary)', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 2,
        "operator": ">="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});

it('simple less than / equal, ', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 3,
        "operator": ">="
      }
    ]
  }, object);

  expect(show).toEqual(true);
});

it('simple strictly more than, ', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 3,
        "operator": ">"
      }
    ]
  }, object);

  expect(show).toEqual(true);
});


it('simple strictly more than, boundary', () => {
  var show = conditionsCheck({
    'gate': 'all',
    'conditions': [
      {
        "target": "grault",
        "value": 2,
        "operator": ">"
      }
    ]
  }, object);

  expect(show).toEqual(false);
});

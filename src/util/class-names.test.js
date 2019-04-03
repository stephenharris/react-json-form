import classNames from './class-names';


it('classNames treats a string as the class', () => {
  expect(classNames('foo')).toEqual("foo");
});

it('classNames treats a number as the class', () => {
  expect(classNames(123)).toEqual("123");
});

it('classNames treats an object as class => toggle map', () => {
  expect(classNames({
    "foo": true,
    "bar": false,
    "baz": true,
    "qui": false,
  })).toEqual("foo baz");
});


it('classname treats an array of string/number as the classes', () => {
  expect(classNames([
    'foo',
    1,
    'bar',
    2
  ])).toEqual("foo 1 bar 2");
});


it('classNames can handle a mixture of types & nested arrays', () => {
  expect(classNames([
    'foo',
    [ 'bar', 'baz'],
    1,
    {
      'hello': true,
      'world': false
    },
    'fuzz'
  ])).toEqual("foo bar baz 1 hello fuzz");
});


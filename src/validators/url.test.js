import urlValidator from './url';


it.each([
    ['https://example.com?foo=1&bar=2', true],
    ['http://example.com?foo=1&amp;bar=2', true],
    ['http://example.com?foo=1&#038;bar=2', true],

    ['httpsnotaurl', false],
    ['"^<>{}`', false],
    ['foo://not-a-protocol.com', false],

])('returns whether %s is a valid url - should be %s', (url, isValid) => {
    var expected = isValid ? undefined : [{
      "id": "invalidurl",
      "message": "Please enter a valid url"
    }];
    let validator = urlValidator({
      'id': "invalidurl",
      "message": "Please enter a valid url"
    });
    expect(validator(url)).toEqual(expected);
  });
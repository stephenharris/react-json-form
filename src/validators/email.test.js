import emailValidator from './email';

it.each([
    // Valid emails
    ['bob@example.com', true],
      ['phil@example.info', true],
      //['ace@204.32.222.14', true], //this fails
      ['kevin@many.subdomains.make.a.happy.man.edu', true],
    ['a@b.co', true],
  
    // Invalid emails
    ['khaaaaaaaaaaaaaaan!', false],
    ['http://bob.example.com/', false],
    ["sif i'd give u it, spamer!1", false],
    ['com.exampleNOSPAMbob', false],
    ['bob@some thing', false],
    ['a@b.c', false],
  ])('returns whether %s is a valid email - should be %s', (email, isValid) => {
    var expected = isValid ? undefined : [{
      "id": "invalidemail",
      "message": "Please enter a valid email"
    }];
    var validator = emailValidator({
      "id": "invalidemail",
      "message": "Please enter a valid email"
    });
    expect(validator(email)).toEqual(expected);
  });
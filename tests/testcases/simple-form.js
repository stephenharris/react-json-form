import { ReactSelector } from 'testcafe-react-selectors';
import { Selector, RequestMock, RequestLogger } from 'testcafe'
import form from '../fixtures/simple-form';
import compareScreenshots from '../compare-screenshots'

var path = require('path');

const mock = RequestMock()
    .onRequestTo({ url: 'http://localhost:3000/simple-form.json', method: 'GET', isAjax: true })
    .respond(form, 200, {
        'access-control-allow-credentials': true,
        'access-control-allow-origin': '*'
    });

    mock.onRequestTo({ url: 'http://localhost:3000/submit/', method: 'POST', isAjax: true })
    .respond({
        'password': [
            {
                "id": "invalidcredentials",
                "message": "No user with this email & password was found"
            }
        ]
    }, 400, {
        'access-control-allow-credentials': true,
        'access-control-allow-origin': '*'
    });

fixture `Todo App test`
    .page('http://localhost:3000/?form=simple-form.json')
    .requestHooks(mock);
    
test('Errors from the server after posting the form a displayed', async t => {
    await t.takeScreenshot('simple-form/intial.png');

    await compareScreenshots(
      path.resolve(__dirname, '../fixtures/simple-form/initial.png'),
      path.resolve(__dirname, '../../screenshots/simple-form/intial.png'),
      0
    );

    await t.typeText(Selector('.json-form-element-email input'), "admin@example.com");
    await t.typeText(Selector('.json-form-element-password input'), "Password1!");
    await t.click(Selector('.json-form-element-submit button'));
    await t.takeScreenshot('simple-form/error-feedback.png');

    await compareScreenshots(
      path.resolve(__dirname, '../fixtures/simple-form/error-feedback.png'),
      path.resolve(__dirname, '../../screenshots/simple-form/error-feedback.png'),
      0
    );

})

test('Fields are validated', async t => {
    await t.typeText(Selector('.json-form-element-email input'), "not an email");
    await t.pressKey( 'tab' );
    await t.expect(Selector('.json-form-element-email .json-form-error').innerText).eql("Please enter a valid email");
});

test('Fields are validated on blur', async t => {
    await t.typeText(Selector('.json-form-element-email input'), "not an email");
    // Error does not appear yet
    await t.expect(Selector('.json-form-element-email .json-form-error').exists).notOk();

    // Error appears whe move away from the field (or submit form, see below)
    await t.pressKey( 'tab' );
    await t.expect(Selector('.json-form-element-email .json-form-error').innerText).eql("Please enter a valid email");
});

test('Test required fields are validated', async t => {
    await t.click(Selector('.json-form-element-submit button'));
    await t.expect(Selector('.json-form-element-password .json-form-error').innerText).eql("This field is required");
});


test('Errors disappear when corrected', async t => {
    await t.typeText(Selector('.json-form-element-email input'), "not an email");
    await t.pressKey( 'tab' );
    await t.expect(Selector('.json-form-element-email .json-form-error').innerText).eql("Please enter a valid email");

    // Entering a valid email removes the error:
    await t.typeText(Selector('.json-form-element-email input'), "admin@example.com");
    await t.expect(Selector('.json-form-element-email .json-form-error').exists).notOk();

});


test('Server-side errors disappear when values changed', async t => {

    await t.typeText(Selector('.json-form-element-email input'), "admin@example.com");
    await t.typeText(Selector('.json-form-element-password input'), "Password1!");
    await t.click(Selector('.json-form-element-submit button'));
    await t.expect(Selector('.json-form-element-password .json-form-error').innerText).eql("No user with this email & password was found");

    // Changing the password removes the error:
    await t.typeText(Selector('.json-form-element-password input'), "NewPassword1!");
    await t.expect(Selector('.json-form-element-password .json-form-error').exists).notOk();
    
})

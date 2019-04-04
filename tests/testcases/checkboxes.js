import { ReactSelector } from 'testcafe-react-selectors';
import { Selector, RequestMock, RequestLogger } from 'testcafe'
import form from '../fixtures/checkbox';
import compareScreenshots from '../compare-screenshots'

var path = require('path');

const mock = RequestMock()
    .onRequestTo({ url: 'http://localhost:3000/simple-form.json', method: 'GET', isAjax: true })
    .respond(form, 200, {
        'access-control-allow-credentials': true,
        'access-control-allow-origin': '*'
    });

const logger = RequestLogger({ url: 'http://localhost:3000/submit/', method: 'post', }, {
    logRequestBody: true,
    stringifyRequestBody: true
});

const fooCheckbox = Selector('input[type="checkbox"][name="checkbox-example[]"][value="foo"]');
const barCheckbox = Selector('input[type="checkbox"][name="checkbox-example[]"][value="bar"]');
const bazCheckbox = Selector('input[type="checkbox"][name="checkbox-example[]"][value="baz"]');


fixture `Todo App test`
    .page('http://localhost:3000/?form=simple-form.json')
    .requestHooks(mock, logger);
    
test('Checkbox options are rendered', async t => {
    await t.takeScreenshot('checkbox/intial.png');

    await compareScreenshots(
      path.resolve(__dirname, '../fixtures/checkbox/initial.png'),
      path.resolve(__dirname, '../../screenshots/checkbox/intial.png'),
      0
    );
})

test('I can select any of the checkboxs', async t => {

    await t.expect( fooCheckbox.checked ).notOk( "Checkbox should not be checked" );

    await t
        .click(fooCheckbox)
        .expect(fooCheckbox.checked).ok("Checkbox should be checked")
        .expect(barCheckbox.checked).notOk( "Checkbox should not be checked" )
        .expect(bazCheckbox.checked).notOk( "Checkbox should not be checked" );

    await t
        .click(bazCheckbox)
        .expect(fooCheckbox.checked).ok("Checkbox should be checked")
        .expect(barCheckbox.checked).notOk( "Checkbox should not be checked" )
        .expect(bazCheckbox.checked).ok("Checkbox should be checked");

    await t.click(Selector('.json-form-element-submit button'));

    var expected = {
        "checkbox-example": {
            "foo": true,
            "bar": false,
            "baz": true
        }
    }

    await t.expect(JSON.parse(logger.requests[0].request.body)).eql(expected, "Form values do not match expected");
    
});

test('Test required fields are validated', async t => {
    await t.click(Selector('.json-form-element-submit button'));
    await t.expect(Selector('.json-form-element-checkbox-example .json-form-error').innerText).eql("Please select at least one");
});

test('Errors disappear when corrected', async t => {

    await t.click(fooCheckbox); // check
    await t.click(fooCheckbox); // uncheck
    
    //Error appears
    await t.expect(Selector('.json-form-element-checkbox-example .json-form-error').innerText).eql("Please select at least one");

    await t.click(fooCheckbox) // check again
    
    // Error disappears
    await t.expect(Selector('.json-form-element-checkbox-example .json-form-error').exists).notOk();
});

import { ReactSelector } from 'testcafe-react-selectors';
import { Selector, RequestMock, RequestLogger } from 'testcafe'
import form from '../fixtures/radio';
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

const fooRadio = Selector('input[type="radio"][name="radio-example"][value="foo"]');
const barRadio = Selector('input[type="radio"][name="radio-example"][value="bar"]');
const bazRadio = Selector('input[type="radio"][name="radio-example"][value="baz"]');


fixture `Todo App test`
    .page('http://localhost:3000/?form=simple-form.json')
    .requestHooks(mock, logger);
    
test('Radio options are rendered', async t => {
    await t.takeScreenshot('radio/intial.png');

    await compareScreenshots(
      path.resolve(__dirname, '../fixtures/radio/initial.png'),
      path.resolve(__dirname, '../../screenshots/radio/intial.png'),
      0
    );
})

test('I can select only one radio buttons', async t => {

    await t.expect( fooRadio.checked ).notOk( "Radio should not be checked" );

    await t
        .click(fooRadio)
        .expect(fooRadio.checked).ok("Radio should be checked")
        .expect(barRadio.checked).notOk( "Radio should not be checked" )
        .expect(bazRadio.checked).notOk( "Radio should not be checked" );

    await t
        .click(bazRadio)
        .expect(fooRadio.checked).notOk( "Radio should not be checked" )
        .expect(barRadio.checked).notOk( "Radio should not be checked" )
        .expect(bazRadio.checked).ok("Radio should be checked");

    await t.click(Selector('.json-form-element-submit button'));

    var expected = {"radio-example": "baz"}

    await t.expect(JSON.parse(logger.requests[0].request.body)).eql(expected, "Form values do not match expected");
    
});

test('Test required fields are validated', async t => {
    await t.click(Selector('.json-form-element-submit button'));
    await t.expect(Selector('.json-form-element-radio-example .json-form-error').innerText).eql("Please select one");
});

test('Errors disappear when corrected', async t => {

    await t.click(Selector('.json-form-element-submit button'));
    await t.expect(Selector('.json-form-element-radio-example .json-form-error').innerText).eql("Please select one");
    
    await t.click(barRadio) // check
    
    // Error disappears
    await t.expect(Selector('.json-form-element-radio-example .json-form-error').exists).notOk();
});

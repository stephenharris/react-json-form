import { ReactSelector } from 'testcafe-react-selectors';
import { Selector, RequestMock, RequestLogger } from 'testcafe'
import form from '../fixtures/select';
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

const select = Selector('select[name="select-example"]');
const selectOptions = select.find('option');

const fooOption = selectOptions.withText('Foo');
const barOption = selectOptions.withText('Bar');
const bazOption = selectOptions.withText('Baz');

fixture `Todo App test`
    .page('http://localhost:3000/?form=simple-form.json')
    .requestHooks(mock, logger);
    
test('Select options are rendered', async t => {
    await t.takeScreenshot('select/intial.png');

    await compareScreenshots(
      path.resolve(__dirname, '../fixtures/select/initial.png'),
      path.resolve(__dirname, '../../screenshots/select/intial.png'),
      0
    );
})

test('I can select only one option', async t => {

    await t.expect( fooOption.selected ).ok( "First select option should be selected by default" );

    await t
        .click(select).click(barOption)
        .expect(fooOption.selected).notOk( "Option should not be selected" )
        .expect(barOption.selected).ok("Option should be selected")
        .expect(bazOption.selected).notOk( "Option should not be selected" );

    await t
        .click(select).click(bazOption)
        .expect(fooOption.selected).notOk( "Option should not be selected" )
        .expect(barOption.selected).notOk( "Option should not be selected" )
        .expect(bazOption.selected).ok("Option should be selected");

    await t.click(Selector('.json-form-element-submit button'));

    var expected = {"select-example": "baz"}

    await t.expect(JSON.parse(logger.requests[0].request.body)).eql(expected, "Form values do not match expected");
    
});

test('Test required fields are validated', async t => {
    await t.click(Selector('.json-form-element-submit button'));
    // Select should have a default value
    await t.expect(Selector('.json-form-element-select-example .json-form-error').exists).notOk();
});

test('Errors disappear when corrected', async t => {

    await t.click(Selector('.json-form-element-submit button'));
    await t.expect(Selector('.json-form-element-select-example .json-form-error').innerText).eql("Please select one");
    
    await t.click(select).click(barOption) // check
    
    // Error disappears
    await t.expect(Selector('.json-form-element-select-example .json-form-error').exists).notOk();
});

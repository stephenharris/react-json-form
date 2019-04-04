import React from 'react';
import Input from './input';
import Name from './name';
import Select from './select';
import Radio from './radio';
import Checkbox from './checkbox';
import Textarea from './textarea';
import Button from './button';
import Repeat from './repeat';
import Fieldset from './fieldset';
import GoogleRecaptcha from './google-recaptcha'

function createElement(elementConfig, ref) {

    var element = window.jsonForm.hooks.applyFilters('json-form.element_component', null, elementConfig);

    if (element !== null) {
        return element;
    }

    switch(elementConfig.type) {
        case 'button':
            return <Button {...elementConfig} ref={ref}/>;
        case 'checkbox':
            return <Checkbox {...elementConfig} ref={ref}/>;
        case 'input':
        case 'email':
            return <Input {...elementConfig} ref={ref}/>;
        case 'fieldset':
            return <Fieldset {...elementConfig} ref={ref}/>;
        case 'google-recaptcha':
            return <GoogleRecaptcha {...elementConfig} ref={ref}/>;
        case 'name':
            return <Name {...elementConfig} ref={ref}/>;
        case 'radio':
            return <Radio {...elementConfig} ref={ref}/>;
        case 'repeat':
            return <Repeat {...elementConfig} ref={ref}/>;
        case 'select':
            return <Select {...elementConfig} ref={ref}/>;
        case 'textarea':
            return <Textarea {...elementConfig} ref={ref}/>;            
        default:
            return null;
    }
}

export default createElement;

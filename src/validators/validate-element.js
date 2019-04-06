import validate from './validate';

export default function validateElement(element, value) {

    var isEmpty = (value === '' || value === undefined || value === null || value === false);
    if (!element.required && isEmpty) {
      // Element is empty, but is optional. Skip validation.
      return [];
    }

    var validations = element.validations ? element.validations : []
    
    var errors = validations.reduce((errors, validation) => {
      var error = validate(validation, value);
      if (error) {
        errors = errors.concat(error);
      }
      return errors;
    }, []);

    return errors;
}


import emailValidator from './email';
import notEmptyValidator from './not-empty';
import urlValidator from './url';
import numberValidator from './number';

export default function validate(validation, value) {
    //oneof - (select, checkbox, radio)?
    //spam / capture
    //name
    switch(validation.id) {
        case 'notempty':
            return notEmptyValidator(validation)(value);
        case 'email':
            return emailValidator(validation)(value);
        case 'url':
            return urlValidator(validation)(value);
        case 'number':
            return numberValidator(validation)(value);
        default:
            return null;
    }
}


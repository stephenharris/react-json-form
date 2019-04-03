export default function notEmpty(validation) {
    console.log(validation);
    return (value) => {
        console.log(value);
        if (typeof value === 'object') {
            console.log(Object.values(value).filter(isNotEmptyValue).length > 0);
            if(Object.values(value).filter(isNotEmptyValue).length > 0) {
                return;
            }

        } else if (isNotEmptyValue(value)) {
            return;
        }

        console.log([{
            "id": validation.id,
            "message": validation.message
        }]);

        return [{
            "id": validation.id,
            "message": validation.message
        }];
    }
}

let isNotEmptyValue = function (value) {
    return (value !== '' && value !== undefined && value !== null && value !== false);
}
export default function numberValidator(validation) {
    return (value) => {
        var regex = /^-?\d*\.?\d+$/gm
        var valueFloat = parseFloat(value);
        if (
            (value === undefined)
            || (typeof value !== 'string' && typeof value !== 'number')
            || (typeof value === 'string' && !value.match(regex))
            || (validation.min !== undefined && valueFloat < validation.min)
            || (validation.max !== undefined && valueFloat > validation.max)
        ) {
            return [{
                "id": validation.id,
                "message": validation.message
            }];
        }
    }
}

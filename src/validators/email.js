export default function emailValidator(validation) {
    return (value) => {
        var regex = new RegExp("^[A-Z0-9._%+!#$&'*\/=?^`{|}~]+@[A-Z0-9.-]+\\.[A-Z]{2,}$","i");
        if (value !== undefined && value.match(regex)) {
            return;
        }
        return [{
            "id": validation.id,
            "message": validation.message
        }];
    }
}

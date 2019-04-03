export default function urlValidator(validation) {
    return (value) => {
        var regex = new RegExp("^(((http[s]?|ftp[s]?|ical):\\/\\/)|(www\.))?([a-z][-a-z0-9]+\.)?([a-z][-a-z0-9]+\\.)?[a-z][-a-z0-9]+\\.[a-z]+[/]?[a-z0-9._\\/~#&=;%+?-]*$","i");
        if (value !== undefined && value.match(regex)) {
            return;
        }
        return [{
            "id": validation.id,
            "message": validation.message
        }];
    }
}

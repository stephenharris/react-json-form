function classNames(arg) { 

    var classes = [];

    var argType = typeof arg;
    var hasOwn = {}.hasOwnProperty;
    
    if (Array.isArray(arg) && arg.length) {
        classes = classes.concat(arg.map(classNames));
    } else if (argType === 'string' || argType === 'number') {
        classes.push(arg);
    } else if (argType === 'object') {
        for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
            }
        }
    }

    return classes.join(' ');
}

export default classNames;
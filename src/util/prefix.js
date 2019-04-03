import {SettingsContext} from './../settings-context';
import React, { useContext } from 'react';


function prefix(className) {

    const contextValue = useContext(SettingsContext);

    return contextValue.prefix + className;
}

export default prefix;

import { observer } from "mobx-react-lite";
import logics from '../../../store/logics';
import React, { useEffect } from 'react';

import Block from '../../Block'

const Logics = observer(({}) => {
    
    useEffect(() => {
        logics.fetchLogics()
    }, []);

    return (
        <Block
            key={logics.logics.key}
            id={logics.logics.key}
            type={logics.logics.type}
            blocks={logics.logics.blocks}
            name={logics.logics.name}
            first={true}
        />
    )
});

export default Logics;
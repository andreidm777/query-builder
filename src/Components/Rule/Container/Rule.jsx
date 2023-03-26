import { Div, Button } from '@vkontakte/vkui';
import { useCallback } from 'react';

import logics from '../../../store/logics';

import './Rule.scss'

const Rule = ({
    id,
    name
}) => {
    return (<Div key={id} className="RuleCard">
        {name}<Div className="ButtonToRight" />
        <Button
            mode="secondary"
            title="Delete"
            onClick={useCallback(() => { logics.deleteRule(id) }, [id])}
        >-Delete</Button>
    </Div>);
}


export default Rule;
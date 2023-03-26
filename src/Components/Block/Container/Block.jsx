import { Div, Button, Select } from '@vkontakte/vkui';
import { observer } from "mobx-react-lite";
import Rule from '../../Rule';
import logics from '../../../store/logics';
import { v4 as uuidv4 } from 'uuid';

import './Block.scss'
import React, { useCallback } from 'react';

const Block = observer(({
    id,
    type,
    blocks,
    name,
    first
}) => {
    const selectedType = name === 'OR' ? "OR" : "AND";
    console.log(blocks);
    console.log(name);

    const ItemChildren = ({ children }) => {
        return (children.map((element) => {
            if (element.type === 'block') {
                return (
                    <Block
                        key={element.key}
                        id={element.key}
                        type={element.type}
                        blocks={element.blocks}
                        name={element.name}
                        first={false}
                    />
                );
            }
            return <Rule name={element.name} id={element.key} />;
        }));
    }

    return (
        <React.Fragment>
            <Div key={id} className='BlockCard'>
                <Div key={uuidv4()} className="ButtonHeader">
                    <Select
                        style={{ width: '100px' }}
                        value={selectedType}
                        options={[
                            { label: 'AND', value: 'AND' },
                            { label: 'OR', value: 'OR' },
                        ]}
                    />
                    <Div className="ButtonToRight" />
                    <Button mode="secondary" title="Add Group" onClick={useCallback(() => { logics.addBlock(id) }, [id])}>+Group</Button>
                    <Button mode="secondary" title="Add Rule" onClick={useCallback(() => { logics.addRule(id) }, [id])}>+Rule</Button>
                    {!first ? <Button mode="secondary" title="Delete" onClick={useCallback(() => { logics.deleteRule(id) }, [id])}>-Delete</Button> : ""}
                </Div>
                {blocks?.length ?
                    <ItemChildren children={blocks} />
                    : ""}
            </Div>
        </React.Fragment>
    );
});

export default Block;
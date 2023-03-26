import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class Logics {
    logics = {}

    constructor() {
        makeAutoObservable(this);
    }

    fetchLogics() {
        fetch('http://localhost:3001/api/v1/logics')
            .then(response => response.json())
            .then(json => {
                this.setLogic(json);
            })
    } 

    _addElement = (key, element) => {
        const stack = [];
        stack.push(this.logics);
        while (stack.length) {
            const current = stack.pop();
            if (current.key === key) {
                current.blocks.push(element);
                return;
            }
            current.blocks.forEach((val) => {
                if (val.type === 'block') {
                    stack.push(val);
                }
            });
        }
    }

    _deleteElement = (key) => {
        const stack = [];
        stack.push(this.logics);
        
        while (stack.length) {
            const current = stack.pop();
            current.blocks = current.blocks.filter((el) => el.key !== key );
            current.blocks.forEach((val) => {
                if (val.type === 'block') {
                    stack.push(val);
                }
            });
        }
    }

    deleteBlock = (key) => {
        this._deleteElement(key);
    }

    deleteRule = (key) => {
        this._deleteElement(key);
    }

    addBlock(key) {
        this._addElement(key, { type: 'block', name: "AND", blocks: [], key: uuidv4() });
    }

    addRule = (key) => {
        this._addElement(key, { type: "rule", name: "Test", key: uuidv4() });
    }

    setLogic = (json) => {
        if (json && typeof json === 'object') {
            const { type } = json;
            if (!type || type !== 'block') {
                json.type = 'block';
                json.blocks = [];
            }
            json.key = uuidv4();
            const stack = [];
            stack.push(json.blocks);
            while (stack.length) {
                const arr = stack.pop();
                arr.forEach(function (val) {
                    val.key = uuidv4();
                    if (val.type === 'block') {
                        stack.push(val.blocks);
                    }
                });
            }
        }
        this.logics = json;
    }
}

export default new Logics();
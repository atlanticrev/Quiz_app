export default class Events {

    constructor() {
        this.events = new Map();
    }

    addEventListener (type, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Handler (second argument) must be a function');
        }
        if (!this.events.has(type)) {
            this.events.set(type, []);
        }
        this.events.get(type).push(handler);
        return true;
    }

    removeEventListener (type, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Second argument must be a function');
        }
        if (!this.events.has(type) || !this.events.get(type).length) {
            throw new Error(`There is no handlers of ${type} event`);
        }
        const index = this.events.get(type).findIndex(func => func === handler);
        this.events.get(type).splice(index, 1);
        !this.events.get(type).length && this.events.delete(type);
        return true;
    }

    dispatchEvent (type, data) {
        if (!this.events.has(type) || !this.events.get(type).length) {
            console.warn(`There is no handlers of ${type} event`);
            return;
        }
        for (let handler of this.events.get(type)) {
            handler(data);
        }
    }

}
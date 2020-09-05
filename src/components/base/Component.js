import Events from './Events';

export default class Component extends Events {

    constructor(options) {
        super();
        for (let option of Object.keys(options)) {
            this[option] = options[option];
        }
        this.el = null;
        this.container = null;
        this.components = null;
    }

    /**
     * @param {Component} component
     * @param {Element} root
     */
    appendComponent (component, root) {
        root.appendChild(component.el);
    }

    appendComponents () {
        for (let key of Object.keys(this.components)) {
            this.appendComponent(this.components[key], this.container);
        }
    }

    /**
     * @param {String} templateString
     * @returns {Element}
     */
    createEl (templateString) {
        const tmp = document.createElement('div');
        tmp.innerHTML = templateString.trim();
        return tmp.firstElementChild;
    }

    createTemplate () {}

    render (root = document.body) {
        root.appendChild(this.el);
    }

    remove () {
        this.el.parentElement.removeChild(this.el);
    }

}
import Events from './Events';

export default class Component extends Events {

    constructor(options) {
        super();
        for (let option of Object.keys(options)) {
            this[option] = options[option];
        }
        this.el = null;
    }

    /**
     * @param {Component} component
     * @param {Element} root
     */
    appendComponent (component, root) {
        root.appendChild(component.el);
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
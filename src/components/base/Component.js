export default class Component extends EventTarget {

    constructor() {
        super();
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
        // @todo sanitize this sting
        tmp.innerHTML = templateString.trim();
        return tmp.firstElementChild;
    }

    createTemplate () {

    }

    render (root = document.body) {
        root.appendChild(this.el);
    }

}
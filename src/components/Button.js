import Component from './base/Component';

export default class Button extends Component {

    static get defaults () {
        return {
            text: 'Дальше',
            role: 'next',
        };
    }

    constructor(options) {
        options = Object.assign({}, Button.defaults, options);
        super(options);
        this.el = this.createEl(this.createTemplate());
        this.bindListeners();
    }

    bindListeners () {
        this.onClick = this.onClick.bind(this);
        this.el.addEventListener('click', this.onClick);
    }

    createTemplate () {
        return `
            <button class="next-button">${this.text}</button>  
        `;
    }

    onClick (e) {
        this.dispatchEvent(new CustomEvent('Button.EVENT_CLICK', {detail: `From: ${this.constructor.name}`}));
    }

}
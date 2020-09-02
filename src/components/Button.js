import Component from './base/Component';

export default class Button extends Component {

    static get defaults () {
        return {
            text: 'Не установлено',
            role: 'next',
        };
    }

    constructor(options) {
        options = Object.assign({}, Button.defaults, options);
        super(options);
        this.el = this.createEl(this.createTemplate());
        this.bindListeners();
        this.update();
    }

    bindListeners () {
        this.onClick = this.onClick.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.el.addEventListener('click', this.onClick);
        this.addEventListener('statusChanged', this.onStatusChange);
    }

    createTemplate () {
        return `
            <button class="next-button">${this.text}</button>  
        `;
    }

    update () {
        this.setButtonText(this.data.status);
    }

    onClick () {
        this.dispatchEvent('Button.EVENT_CLICK');
    }

    onStatusChange (e) {
        console.log(`${this.constructor.name}: status -> ${e.detail.status}`, this.data);
        this.setButtonText(e.detail.status);
    }

    setButtonText (status) {
        this.text = status === this.data.stateList.TICKING ? 'Принять' : 'Далее';
        this.el.textContent = this.text;
    }

}